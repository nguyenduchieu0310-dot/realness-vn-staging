/**
 * 360-degree Image Rotation Viewer
 * Core functionality for interactive 360° panorama viewing
 */
// --- Constants ---
// Duration for menu item slide in/out animation (matches CSS)
const MENU_ITEM_ANIMATION_DURATION = 800; // 0.8s
// Stagger delay between menu items
const MENU_ITEM_STAGGER_DELAY = 100; // 0.1s
// Duration for the body fade-out effect (matches CSS transition)
const PAGE_FADE_DURATION = 500; // 0.5s
// Core Configuration
const totalImages = 41;
const anglePerImage = 360 / totalImages; // ~8.78° per image
const moveThreshold = 5;
const timeThreshold = 20; // Reduced for better sensitivity

// DOM Elements
const container = document.getElementById("container");

// Các vị trí cố định mà hình ảnh sẽ tự động quay về
const FIXED_POSITIONS = [39, 3, 8, 13, 18, 24, 29, 34];
const SNAP_THRESHOLD = 3; // Ngưỡng để xác định khi nào nên "hút" về vị trí cố định

// State Variables
let currentImageIndex = 39; // Default to the main view (index 39)
let isInteracting = false;
let startX = 0;
let lastMoveTime = 0;
let lastMoveX = 0;
let images = [];
let rectanglesData = [];
let loadedRectangles = [];

// Inertia Effect Variables
let velocityX = 0;
let moveHistory = []; // Tracks movement history for velocity calculation
const maxHistoryLength = 5;
let inertiaAnimationId = null;
const frictionCoefficient = 0.75; // Higher friction (lower value) = faster stopping
const maxInertiaFrames = 5; // Limit max inertia animation frames
let inertiaFrameCount = 0;

// Memory Optimization Variables
const MEMORY_OPTIMIZATION_INTERVAL = 5000; // 5 seconds
let VISIBLE_IMAGE_BUFFER = 3; // Number of images to keep loaded around current image
let memoryOptimizationTimer = null;
let isLowEndDevice = false;

// Auto-Rotation Variables
const AUTO_ROTATE_DELAY = 500000; // Milliseconds of inactivity before auto-rotating
let autoRotateTimer = null;
window.preloadedImages = [];
// SVG path information
const SVG_PATH_INFO = {};

/**
 * Detect device performance to optimize for low-end devices
 */
function checkDevicePerformance() {
    // Check RAM if available in browser
    if (navigator.deviceMemory && navigator.deviceMemory < 4) {
        isLowEndDevice = true;
    }

    // Simple CPU performance check
    const startTime = performance.now();
    let count = 0;
    for (let i = 0; i < 1000000; i++) {
        count += i;
    }
    const endTime = performance.now();

    // If processing takes too long, mark as low-end device
    if (endTime - startTime > 100) {
        isLowEndDevice = true;
    }

    // Adjust parameters for low-end devices
    if (isLowEndDevice) {
        console.log("Detected low-end device, optimizing for performance");
        VISIBLE_IMAGE_BUFFER = 2; // Reduce buffer size
    }
}
/**
 * Initialize the 360 viewer after images are loaded
 */
function initializeViewer() {
    // Check device performance first
    checkDevicePerformance();

    // Use preloaded images if available
    if (window.preloadedImages && window.preloadedImages.length > 0) {
        images = window.preloadedImages;
    } else {
        preloadAllImages();
    }

    // Show first image
    if (images.length > 0) {
        requestAnimationFrame(() => {
            images.forEach((img, i) => {
                if (i === 39) {
                    // 39 is the default view index
                    img.style.display = "block";
                    img.classList.add("active");
                } else {
                    img.style.display = "none";
                    img.classList.remove("active");
                }
            });
        });
    }

    // Đảm bảo ẩn tất cả các SVG trước khi khởi tạo
    updateInitialSvg();

    // Initialize components with slight delays for better performance
    initSvgPathHover();
    startMemoryOptimization();
    startAutoRotateTimer();
}

/**
 * Cập nhật hiển thị SVG ban đầu - chỉ hiển thị SVG phù hợp với index ban đầu
 */
function updateInitialSvg() {
    // Ẩn tất cả SVG trước
    document.querySelectorAll(".floor-svg").forEach((svg) => {
        svg.classList.add("floor-svg-hidden");
        svg.classList.remove("floor-svg-default-view");
    });

    // Chỉ hiển thị SVG phù hợp với chỉ số ban đầu
    const defaultSvg =
        currentImageIndex === 39
            ? document.getElementById("floorSvg")
            : document.getElementById(`floorSvg${currentImageIndex}`);

    if (defaultSvg) {
        defaultSvg.classList.add("floor-svg-default-view");
        defaultSvg.classList.remove("floor-svg-hidden");
        // console.log(`Hiển thị SVG ban đầu: ${defaultSvg.id}`);
    }
}

/**
 * Start memory optimization process
 */
function startMemoryOptimization() {
    if (memoryOptimizationTimer) {
        clearInterval(memoryOptimizationTimer);
    }

    if (isLowEndDevice || images.length >= 20) {
        memoryOptimizationTimer = setInterval(
            optimizeMemory,
            MEMORY_OPTIMIZATION_INTERVAL
        );
        optimizeMemory();
    }
}

/**
 * Initialize hover effects for SVG paths
 * Creates tooltips showing floor information when hovering over building floors
 */
function initSvgPathHover() {
    // Khởi tạo biến dùng chung
    let tooltip = null;
    let activeHoverPath = null;
    let tooltipTimeout = null;

    /**
     * Create tooltip element if it doesn't exist
     * @returns {HTMLElement} The tooltip element
     */
    function createTooltip() {
        if (tooltip) return tooltip;

        tooltip = document.createElement("div");
        tooltip.id = "svg-tooltip";
        tooltip.classList.add("svg-tooltip");
        tooltip.style.position = "absolute";
        tooltip.style.fontFamily = "UTM Optima";
        tooltip.style.background = "rgba(0,0,0,0.8)";
        tooltip.style.fontWeight = "bold";
        tooltip.style.color = "#fff";
        tooltip.style.border = "1px solid rgba(236, 227, 227, 0.81)";
        tooltip.style.padding = "8px 12px";
        tooltip.style.borderRadius = "10px";
        tooltip.style.fontSize = "15px";
        tooltip.style.zIndex = "1000";
        tooltip.style.pointerEvents = "none";
        tooltip.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
        tooltip.style.opacity = "0";
        tooltip.style.transition = "opacity 0.2s ease-out";
        document.body.appendChild(tooltip);

        return tooltip;
    }

    /**
     * Completely remove tooltip from DOM
     */
    function removeTooltip() {
        if (tooltip && tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
            tooltip = null;
        }

        if (tooltipTimeout) {
            clearTimeout(tooltipTimeout);
            tooltipTimeout = null;
        }
    }

    /**
     * Hide tooltip with fade effect
     */
    function hideTooltip() {
        if (tooltip) {
            tooltip.style.opacity = "0";

            // Remove from DOM after transition completes
            if (tooltipTimeout) clearTimeout(tooltipTimeout);
            tooltipTimeout = setTimeout(() => {
                removeTooltip();
            }, 300);
        }
    }

    // Function to reset active hover path
    function resetActivePath() {
        if (activeHoverPath) {
            activeHoverPath.style.fill = "transparent";
            activeHoverPath.style.strokeWidth = "1";
            activeHoverPath.style.stroke = "rgba(0, 0, 0, 0)";
            activeHoverPath = null;
        }

        hideTooltip();
    }

    // Áp dụng hover cho tất cả các SVG container
    document.querySelectorAll(".floor-svg").forEach((svgContainer) => {
        // Kiểm tra sự tồn tại của container
        if (!svgContainer) return;

        // Chỉ thiết lập pointer-events, KHÔNG thiết lập display và opacity
        // để tránh hiện tất cả SVG khi khởi tạo
        svgContainer.style.pointerEvents = "none";

        // Get all interactive paths
        const hoverPaths = svgContainer.querySelectorAll(".hover-path");

        // Add hover events to each path
        hoverPaths.forEach((path) => {
            // Get parent group and path IDs
            const parentGroup = path.closest("g");
            const groupId = parentGroup ? parentGroup.id : "Unknown";
            const pathId = path.id || "Unknown";

            // Create tooltip content
            const tooltipContent = `Tháp:  ${pathId}`;

            // Mouse enter event
            path.addEventListener("mouseenter", (e) => {
                // Reset any previous active path
                resetActivePath();

                // Set current path as active
                activeHoverPath = path;

                // Create tooltip when needed
                const currentTooltip = createTooltip();

                // Position and show tooltip
                currentTooltip.textContent = tooltipContent;
                currentTooltip.style.left = `${e.clientX + 15}px`;
                currentTooltip.style.top = `${e.clientY - 15}px`;
                currentTooltip.style.fontFamily = "UTM Optima";
                currentTooltip.style.background = "#091D36";
                currentTooltip.style.color = "#fff";
                currentTooltip.style.border = "1px solid rgba(236, 227, 227, 0.81)";
                currentTooltip.style.padding = "6px 12px 6px 12px";
                currentTooltip.style.borderRadius = "20px";
                currentTooltip.style.fontSize = "15px";

                // Clear any existing hide timeout
                if (tooltipTimeout) {
                    clearTimeout(tooltipTimeout);
                    tooltipTimeout = null;
                }

                // Show tooltip with a slight delay
                setTimeout(() => {
                    currentTooltip.style.opacity = "1";
                }, 10);

                // Highlight path
                path.style.fill = "rgba(255, 255, 255, 0.06)";
                path.style.strokeWidth = "2";
                path.style.stroke = "rgba(255, 255, 255, 0.6)";
            });

            // Mouse move event - update tooltip position
            path.addEventListener("mousemove", (e) => {
                if (tooltip) {
                    tooltip.style.left = `${e.clientX + 15}px`;
                    tooltip.style.top = `${e.clientY - 15}px`;
                }
            });

            // Mouse leave event
            path.addEventListener("mouseleave", () => {
                // Only reset if this path is the active one
                if (activeHoverPath === path) {
                    resetActivePath();
                }
            });
        });

        // Additional event listener for the container to ensure hover reset
        svgContainer.addEventListener("mouseleave", resetActivePath);
    });

    // Add listener to the document to catch rapid mouse movements
    document.addEventListener("mousemove", (e) => {
        // Check if mouse is outside any SVG container and we still have an active path
        if (activeHoverPath || tooltip) {
            let isInsideSvg = false;
            document.querySelectorAll(".floor-svg").forEach((svgContainer) => {
                const svgRect = svgContainer.getBoundingClientRect();
                if (
                    e.clientX >= svgRect.left &&
                    e.clientX <= svgRect.right &&
                    e.clientY >= svgRect.top &&
                    e.clientY <= svgRect.bottom &&
                    window.getComputedStyle(svgContainer).display !== "none"
                ) {
                    isInsideSvg = true;
                }
            });

            if (!isInsideSvg) {
                resetActivePath();
            }
        }
    });

    // Clean up tooltip and paths on clicks
    document.addEventListener("click", resetActivePath);

    // Clean up on page change or removal
    window.addEventListener("beforeunload", removeTooltip);
}

// Document ready event để đảm bảo SVG hiển thị
document.addEventListener("DOMContentLoaded", function () {
    // Đảm bảo SVG chỉ hiển thị ở view mặc định
    const floorSvg = document.getElementById("floorSvg");
    if (floorSvg) {
        if (currentImageIndex === 39) {
            // 39 is the default view index
            floorSvg.classList.add("floor-svg-default-view");
            floorSvg.classList.remove("floor-svg-hidden");
        } else {
            floorSvg.classList.add("floor-svg-hidden");
            floorSvg.classList.remove("floor-svg-default-view");
        }
        floorSvg.style.pointerEvents = "none";
    }
});

// Tối ưu bộ nhớ bằng cách dọn dẹp hình ảnh không cần thiết
function optimizeMemory() {
    // Dọn dẹp các biến tạm
    moveHistory = moveHistory.slice(-maxHistoryLength);

    // Chỉ tiếp tục nếu có đủ hình ảnh
    if (images.length <= VISIBLE_IMAGE_BUFFER * 2 + 1) return;

    // Loại bỏ hoặc giảm chất lượng các hình không hiển thị
    images.forEach((img, index) => {
        // Giữ các hình ảnh gần hình hiện tại
        const distance = Math.abs(index - currentImageIndex);
        // Tính toán khoảng cách theo mô hình vòng tròn
        const wrappedDistance = Math.min(distance, totalImages - distance);

        if (wrappedDistance > VISIBLE_IMAGE_BUFFER) {
            // Đối với hình ảnh xa hơn bộ đệm
            if (isLowEndDevice) {
                // Trên thiết bị yếu, tạm thời lưu đường dẫn và xóa nội dung
                if (!img.dataset.originalSrc && img.src) {
                    img.dataset.originalSrc = img.src;
                    // Thay bằng hình 1x1 pixel trong suốt
                    img.src =
                        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
                }
            }
        } else {
            // Khôi phục hình ảnh nếu cần
            if (img.dataset.originalSrc) {
                img.src = img.dataset.originalSrc;
                delete img.dataset.originalSrc;
            }
        }
    });

    // Khuyến nghị garbage collection
    if (window.gc) {
        try {
            window.gc();
        } catch (e) {
            console.log("Manual GC not available");
        }
    }
}

// Update Active Image
const updateImage = (index, isInertia = false) => {
    if (index < 0 || index >= images.length) return;

    // Xử lý wrap-around để xoay liên tục
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;

    // Nếu không có thay đổi, không cần cập nhật
    if (currentImageIndex === index) return;

    // Đảm bảo hiển thị SVG tương ứng với mỗi view đặc biệt
    // 1. Ẩn tất cả SVG trước
    document.querySelectorAll(".floor-svg").forEach((svg) => {
        svg.classList.add("floor-svg-hidden");
        svg.classList.remove("floor-svg-default-view");
    });

    // 2. Tìm SVG phù hợp với index hiện tại
    // Trường hợp đặc biệt cho index 39 (sử dụng floorSvg không có hậu tố)
    let svgToShow =
        index === 39
            ? document.getElementById("floorSvg")
            : document.getElementById(`floorSvg${index}`);

    // 3. Hiển thị SVG nếu tìm thấy
    if (svgToShow) {
        svgToShow.classList.add("floor-svg-default-view");
        svgToShow.classList.remove("floor-svg-hidden");
    }

    // Sử dụng requestAnimationFrame để cập nhật UI mượt mà
    requestAnimationFrame(() => {
        // Khôi phục hình sắp hiển thị nếu nó đã bị tối ưu
        const nextImg = images[index];
        if (nextImg.dataset.originalSrc) {
            nextImg.src = nextImg.dataset.originalSrc;
            delete nextImg.dataset.originalSrc;
        }

        // Hiển thị hình mới, ẩn hình cũ
        images.forEach((img, i) => {
            if (i === index) {
                img.style.display = "block";
                img.classList.add("active");
            } else {
                img.style.display = "none";
                img.classList.remove("active");
            }
        });

        // Chỉ hiển thị rectangles ở vị trí đầu tiên
        const showRectangles = index === 39; // 39 is the index for the main view
        loadedRectangles.forEach((rect) => {
            rect.style.display = showRectangles ? "block" : "none";
        });

        currentImageIndex = index;
        updateCompass();

        // Gọi tối ưu bộ nhớ khi có thay đổi lớn về vị trí
        if (
            !isInertia &&
            Math.abs(index - currentImageIndex) > VISIBLE_IMAGE_BUFFER
        ) {
            optimizeMemory();
        }
    });
};

// Update Compass
const updateCompass = () => {
    const compassNeedle = document.querySelector(".compass-needle");
    const compassContainer = document.getElementById("compass-container");
    if (compassNeedle || compassContainer) {
        const angle = -(currentImageIndex * anglePerImage);
        requestAnimationFrame(() => {
            if (compassNeedle) {
                compassNeedle.style.transform = `rotate(${angle}deg)`;
            }
            if (compassContainer) {
                compassContainer.style.transform = `rotate(${angle}deg)`;
            }
        });
    }
};

// Áp dụng hiệu ứng quán tính
function applyInertia() {
    // Giảm dần vận tốc theo hệ số ma sát
    velocityX *= frictionCoefficient;

    // Kích hoạt class hiệu ứng quán tính
    document.body.classList.add("inertia-active");

    // Tăng bộ đếm frame
    inertiaFrameCount++;

    // Kiểm tra xem đã gần đến một vị trí cố định chưa
    const nearest = findNearestFixedPosition(currentImageIndex);
    if (nearest.distance <= SNAP_THRESHOLD && inertiaFrameCount > 1) {
        // Tính xác suất - tốc độ thấp + khoảng cách gần = xác suất cao hơn
        // Vận tốc càng thấp và khoảng cách càng nhỏ, xác suất càng cao
        const velocityFactor = Math.min(
            1,
            Math.max(0, 1 - Math.abs(velocityX) * 2)
        );
        const distanceFactor = 1 - nearest.distance / SNAP_THRESHOLD;
        const probability = 0.5 * distanceFactor * velocityFactor;

        // Tạo số ngẫu nhiên giữa 0-1
        const random = Math.random();

        // Nếu số ngẫu nhiên nhỏ hơn xác suất tính được, snap về vị trí cố định
        if (random < probability) {
            console.log(
                `Inertia snap: ${nearest.position} (prob: ${Math.round(
                    probability * 100
                )}%)`
            );
            stopInertia();
            animateRotateToDirection(nearest.position, 8);
            return;
        }
    }

    // Tính toán số hình ảnh cần di chuyển dựa trên vận tốc
    const moveDistance = velocityX * 5; // Giảm từ 10 xuống 5 để quán tính nhẹ hơn

    // Dừng quán tính nếu đã đạt số frame tối đa hoặc vận tốc quá nhỏ
    if (inertiaFrameCount > maxInertiaFrames || Math.abs(moveDistance) < 0.7) {
        // Khi dừng quán tính, kiểm tra xem có nên snap về vị trí cố định không
        const finalNearest = findNearestFixedPosition(currentImageIndex);
        if (finalNearest.distance <= SNAP_THRESHOLD / 2) {
            // Ngưỡng thấp hơn khi kết thúc quán tính
            const finalProb =
                0.5 - (finalNearest.distance / (SNAP_THRESHOLD / 2)) * 0.3;
            if (Math.random() < finalProb) {
                stopInertia();
                animateRotateToDirection(finalNearest.position, 8);
                return;
            }
        }

        stopInertia();
        return;
    }

    // Chỉ di chuyển nếu khoảng cách đủ lớn
    if (Math.abs(moveDistance) > 0.5) {
        const direction = moveDistance > 0 ? 1 : -1;
        const nextIndex =
            (currentImageIndex - direction + totalImages) % totalImages;

        // Cập nhật hình ảnh với flag quán tính
        updateImage(nextIndex, true);

        // Tiếp tục hiệu ứng quán tính
        inertiaAnimationId = requestAnimationFrame(applyInertia);
    } else {
        // Dừng hiệu ứng khi vận tốc quá nhỏ
        stopInertia();
    }
}

// Dừng hiệu ứng quán tính
function stopInertia() {
    if (inertiaAnimationId !== null) {
        cancelAnimationFrame(inertiaAnimationId);
        inertiaAnimationId = null;
    }
    document.body.classList.remove("inertia-active");
    velocityX = 0;
    moveHistory = [];

    // Bắt đầu lại bộ hẹn giờ tự động quay
    startAutoRotateTimer();
}

// Handle Mouse/Touch Move với theo dõi vận tốc
function handleMove(clientX) {
    if (!isInteracting) return;

    // Reset bộ hẹn giờ tự động quay khi người dùng tương tác
    resetAutoRotateTimer();

    const currentTime = Date.now();
    const timeElapsed = currentTime - lastMoveTime;

    if (timeElapsed < timeThreshold) return;

    const diff = clientX - startX;

    // Hiển thị chỉ báo hướng kéo
    updateDragDirection(diff);

    // Ghi lại lịch sử di chuyển để tính vận tốc
    moveHistory.push({
        position: clientX,
        time: currentTime,
    });

    // Giữ lịch sử di chuyển trong giới hạn
    if (moveHistory.length > maxHistoryLength) {
        moveHistory.shift();
    }

    if (Math.abs(diff) > moveThreshold) {
        // Tính toán hướng và cập nhật chỉ số hình ảnh
        const direction = diff > 0 ? 1 : -1;
        const nextIndex =
            (currentImageIndex - direction + totalImages) % totalImages;
        updateImage(nextIndex);

        // Không cần phản hồi trực quan khi đạt đến vị trí cố định

        // Cập nhật các biến theo dõi
        lastMoveTime = currentTime;
        lastMoveX = clientX;
        startX = clientX;
    }
}

// Tính toán vận tốc dựa trên lịch sử di chuyển
function calculateVelocity() {
    if (moveHistory.length < 2) return 0;

    // Lấy mẫu đầu và cuối của lịch sử
    const newest = moveHistory[moveHistory.length - 1];
    const oldest = moveHistory[0];

    // Tính toán thời gian và khoảng cách
    const timeDiff = newest.time - oldest.time;
    const posDiff = newest.position - oldest.position;

    // Tránh chia cho 0
    if (timeDiff === 0) return 0;

    // Tính vận tốc (pixel / milisecond)
    let velocity = posDiff / timeDiff;

    // Giới hạn vận tốc trong phạm vi hợp lý
    const maxVelocity = 2.0;
    velocity = Math.max(Math.min(velocity, maxVelocity), -maxVelocity);

    return velocity;
}

// Hiển thị chỉ báo hướng kéo
function updateDragDirection(diff) {
    const leftIndicator = document.querySelector(".drag-indicator.left");
    const rightIndicator = document.querySelector(".drag-indicator.right");

    if (diff > 0) {
        // Kéo về bên phải
        rightIndicator.style.opacity = "1";
        leftIndicator.style.opacity = "0.3";
    } else {
        // Kéo về bên trái
        leftIndicator.style.opacity = "1";
        rightIndicator.style.opacity = "0.3";
    }
}

// Start Interaction
function startInteraction(clientX) {
    // Dừng hiệu ứng quán tính nếu đang chạy
    stopInertia();

    // Reset bộ hẹn giờ tự động quay khi người dùng bắt đầu tương tác
    resetAutoRotateTimer();

    isInteracting = true;
    startX = clientX;
    lastMoveX = clientX;
    container.style.cursor = "grabbing";
    lastMoveTime = Date.now();

    // Xóa lịch sử di chuyển cũ
    moveHistory = [];
}

// End Interaction - bắt đầu hiệu ứng quán tính với xác suất snap về vị trí cố định
function endInteraction() {
    if (isInteracting) {
        isInteracting = false;
        container.style.cursor = "grab";

        // Tính toán vận tốc khi thả
        velocityX = calculateVelocity();

        // Reset bộ đếm frame quán tính
        inertiaFrameCount = 0;

        // Kiểm tra xem có gần một vị trí cố định không
        const nearest = findNearestFixedPosition(currentImageIndex);

        // Tính xác suất snap dựa trên độ gần với vị trí cố định
        // Khoảng cách càng nhỏ, xác suất càng cao
        if (nearest.distance <= SNAP_THRESHOLD) {
            // Tính xác suất - khoảng cách càng nhỏ, xác suất càng cao
            // 0 khoảng cách = 90% xác suất, khoảng cách SNAP_THRESHOLD = 20% xác suất
            const probability = 0.9 - (nearest.distance / SNAP_THRESHOLD) * 0.7;

            // Tạo số ngẫu nhiên giữa 0-1
            const random = Math.random();

            // Nếu số ngẫu nhiên nhỏ hơn xác suất tính được, snap về vị trí cố định
            if (random < probability) {
                console.log(
                    `Snap to fixed position: ${nearest.position
                    } (probability: ${Math.round(probability * 100)}%)`
                );
                animateRotateToDirection(nearest.position, 10); // Xoay mượt mà đến vị trí cố định
                return;
            }
        }

        // Áp dụng hiệu ứng quán tính nếu vận tốc đủ lớn
        if (Math.abs(velocityX) > 0.2) {
            inertiaAnimationId = requestAnimationFrame(applyInertia);
        } else {
            // Nếu không có quán tính, bắt đầu bộ hẹn giờ tự động quay
            startAutoRotateTimer();
        }
    }
}

// Bắt đầu bộ hẹn giờ tự động quay
function startAutoRotateTimer() {
    resetAutoRotateTimer();
    autoRotateTimer = setTimeout(() => {
        animateRotateToDirection(39); // Rotate to default position (39)
    }, AUTO_ROTATE_DELAY);
}

// Reset bộ hẹn giờ tự động quay
function resetAutoRotateTimer() {
    if (autoRotateTimer) {
        clearTimeout(autoRotateTimer);
        autoRotateTimer = null;
    }
}

// Tính khoảng cách theo chiều kim đồng hồ từ chỉ số hiện tại đến chỉ số đích
function calculateDistanceClockwise(fromIndex, toIndex) {
    // Đảm bảo toIndex > 0
    if (toIndex === fromIndex) return totalImages; // Nếu đã ở hướng đó, coi như 1 vòng đầy đủ

    // Tính khoảng cách theo chiều kim đồng hồ
    let distance = (toIndex - fromIndex) % totalImages;
    if (distance <= 0) distance += totalImages;

    return distance;
}

// Hiệu ứng quay mượt đến hướng chính
function animateRotateToDirection(targetIndex, steps = 15) {
    // Reset bất kỳ hiệu ứng quay nào đang diễn ra
    stopInertia();

    // Tính toán khoảng cách và hướng
    const distance = calculateDistanceClockwise(currentImageIndex, targetIndex);
    const stepSize = Math.max(1, Math.floor(distance / steps));

    // Bắt đầu hiệu ứng quay mượt
    let currentStep = 0;

    function rotateStep() {
        currentStep++;

        // Nếu đã gần đến đích, nhảy trực tiếp
        if (
            currentStep >= steps - 1 ||
            Math.abs(currentImageIndex - targetIndex) <= stepSize
        ) {
            updateImage(targetIndex);
            startAutoRotateTimer(); // Đặt lại hẹn giờ sau khi hoàn thành
            return;
        }

        // Di chuyển theo từng bước
        const nextIndex = (currentImageIndex + stepSize) % totalImages;
        updateImage(nextIndex);

        // Tiếp tục quay sau một khoảng thời gian
        setTimeout(rotateStep, 50);
    }

    // Bắt đầu quá trình quay
    rotateStep();
}

// Legacy preload method - only used as fallback
const preloadAllImages = () => {
    console.log("Using fallback image loading");
    images = [];

    for (let i = 0; i < totalImages; i++) {
        const img = document.createElement("img");
        const fileNumber = 10000 + i;

        // Kiểm tra trường hợp đặc biệt cho file SVG
        if (i === 39) {
            // Các index cho file SVG đặc biệt
            img.src = `./krpano/rotate/Rotate-hous/imgs/${fileNumber}.jpg`;
        } else {
            img.src = `./krpano/rotate/Rotate-hous/imgs/${fileNumber}.jpg`;
        }

        img.alt = `Góc ${fileNumber}`;
        img.style.display = "none";
        container.appendChild(img);
        images.push(img);
    }

    if (images.length > 0) {
        images[39].style.display = "block";
        images[39].classList.add("active");
    }
};

// Create Rectangles
const createRectangleElements = () => {
    // Xóa các rectangle hiện có để tránh trùng lặp
    loadedRectangles.forEach((rect) => rect.remove());
    loadedRectangles = [];

    // Kiểm tra dữ liệu JSON có hợp lệ không
    if (!rectanglesData || rectanglesData.length === 0) {
        console.warn("No rectangles data available.");
        return;
    }

    // Kích thước cơ sở (base) của hình ảnh
    const baseWidth = 1800;
    const baseHeight = 820;

    // Lấy kích thước hiện tại của container
    const containerRect = container.getBoundingClientRect();
    const currentWidth = containerRect.width;
    const currentHeight = containerRect.height;

    // Tính tỷ lệ dựa trên cả chiều rộng và chiều cao, lấy giá trị nhỏ hơn để giữ tỷ lệ khung hình
    const scaleX = currentWidth / baseWidth;
    const scaleY = currentHeight / baseHeight;
    const scale = Math.min(scaleX, scaleY);

    // Cập nhật hình ảnh hiện tại và trạng thái hiển thị của rectangles
    updateImage(currentImageIndex);
};

// Reset Button and Show Name reset functionality
function resetToDefaultView() {
    // Dừng hiệu ứng quán tính
    stopInertia();

    // Quay về vị trí ban đầu
    updateImage(39);
    isInteracting = false;
    container.style.cursor = "grab";

    // Hiển thị SVG khi quay về view mặc định
    const floorSvg = document.getElementById("floorSvg");
    if (floorSvg) {
        floorSvg.classList.add("floor-svg-default-view");
        floorSvg.classList.remove("floor-svg-hidden");
    }

    startAutoRotateTimer();
}

function resetview() {
    resetToDefaultView();
}
let resetBtn = document.getElementById("reset_btn");
if (resetBtn) {
    resetBtn.addEventListener("click", resetview);
}
window.resetview = resetview;
// Functions for rotating through fixed positions with improved navigation
function rotateLeft() {
    // Stop inertia effect if running
    stopInertia();
    resetAutoRotateTimer();

    // Find the next position in the sequence
    const currentPos = FIXED_POSITIONS.indexOf(currentImageIndex);

    if (currentPos !== -1) {
        // If we're already at a fixed position, go to the next one in the array
        const nextPos = (currentPos + 1) % FIXED_POSITIONS.length;
        const targetPosition = FIXED_POSITIONS[nextPos];

        // Use custom animation that chooses the shortest path
        animateRotateShortestPath(targetPosition);
    } else {
        // If not at a fixed position, find the nearest next position
        let nextPosition = FIXED_POSITIONS[0];
        let minForwardDistance = totalImages;

        // Find the next position with the smallest forward distance
        FIXED_POSITIONS.forEach((position) => {
            // Calculate forward distance (counter-clockwise)
            const forwardDistance =
                (position - currentImageIndex + totalImages) % totalImages;

            // Only consider positions ahead (not the current position)
            if (forwardDistance > 0 && forwardDistance < minForwardDistance) {
                minForwardDistance = forwardDistance;
                nextPosition = position;
            }
        });

        // Use custom animation that chooses the shortest path
        animateRotateShortestPath(nextPosition);
    }
}
let rotateLeftElm = document.getElementById("rotate_left_btn");
if (rotateLeftElm) {
    rotateLeftElm.addEventListener("click", rotateLeft);
}
window.rotateLeft = rotateLeft;
function toggleSound(element) {
    // Get the audio element
    const audio = document.getElementById("backgroundMusic");
    let isSoundOn = localStorage.getItem("vr360_sound") === "true";
    if (!audio) return;

    // Toggle audio playback
    if (!isSoundOn) {
        audio.play();
        element.classList.remove("active");
        // Change icon if needed
        const img = element.querySelector("img");
        if (img && img.src.includes("_x.png")) {
            img.src = img.src.replace("_x.png", ".png");
        }
    } else {
        audio.pause();
        element.classList.add("active");
        // Change icon if needed
        const img = element.querySelector("img");
        if (img && !img.src.includes("_x.png")) {
            img.src = img.src.replace(".png", "_x.png");
        }
    }
}
let soundBtn = document.getElementById("sound_btn");
if (soundBtn) {
    soundBtn.addEventListener("click", function () {
        toggleSound(this);
    });
}
function toggleFullscreen() {
    if (
        !document.fullscreenElement && // alternative standard method
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement
    ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(
                Element.ALLOW_KEYBOARD_INPUT
            );
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}
let fullscreenBtn = document.getElementById("fullscreen_btn");
if (fullscreenBtn) {
    fullscreenBtn.addEventListener("click", toggleFullscreen);
}
const helpGuide = document.getElementById("huongdan");

function showHelpGuide() {
    helpGuide.style.display = "flex";
}
let helpGuideBtn = document.getElementById("help_btn");
if (helpGuideBtn) {
    helpGuideBtn.addEventListener("click", showHelpGuide);
}
window.showHelpGuide = showHelpGuide;

// let closeHelpGuideBtn = document.getElementById("hdbutton");
// console.log(closeHelpGuideBtn);

// if (closeHelpGuideBtn) {
//     closeHelpGuideBtn.addEventListener("click", function () {
//         helpGuide.style.display = "none";
//     });
// }
function rotateRight() {
    // Stop inertia effect if running
    stopInertia();
    resetAutoRotateTimer();

    // Find the previous position in the sequence
    const currentPos = FIXED_POSITIONS.indexOf(currentImageIndex);

    if (currentPos !== -1) {
        // If we're already at a fixed position, go to the previous one in the array
        const prevPos =
            (currentPos - 1 + FIXED_POSITIONS.length) % FIXED_POSITIONS.length;
        const targetPosition = FIXED_POSITIONS[prevPos];

        // Use custom animation that chooses the shortest path
        animateRotateShortestPath(targetPosition);
    } else {
        // If not at a fixed position, find the nearest previous position
        let prevPosition = FIXED_POSITIONS[0];
        let minBackwardDistance = totalImages;

        // Find the previous position with the smallest backward distance
        FIXED_POSITIONS.forEach((position) => {
            // Calculate backward distance (clockwise)
            const backwardDistance =
                (currentImageIndex - position + totalImages) % totalImages;

            // Only consider positions behind (not the current position)
            if (backwardDistance > 0 && backwardDistance < minBackwardDistance) {
                minBackwardDistance = backwardDistance;
                prevPosition = position;
            }
        });

        // Use custom animation that chooses the shortest path
        animateRotateShortestPath(prevPosition);
    }
}
let rotateRightElm = document.getElementById("rotate_right_btn");
if (rotateRightElm) {
    rotateRightElm.addEventListener("click", rotateRight);
}
window.rotateRight = rotateRight;

/**
 * Animates rotation to target position using the shortest path
 * @param {number} targetIndex - Target image index
 */
function animateRotateShortestPath(targetIndex) {
    // Stop any ongoing rotation effects
    stopInertia();

    // Calculate distances in both directions
    const clockwiseDistance =
        (currentImageIndex - targetIndex + totalImages) % totalImages;
    const counterClockwiseDistance =
        (targetIndex - currentImageIndex + totalImages) % totalImages;

    // Choose the shorter path
    const isClockwise = clockwiseDistance < counterClockwiseDistance;
    const shortestDistance = Math.min(
        clockwiseDistance,
        counterClockwiseDistance
    );

    // Calculate appropriate number of steps based on distance
    const steps = Math.max(5, Math.min(15, Math.floor(shortestDistance / 2)));

    // Start smooth rotation animation
    let currentStep = 0;

    function rotateStep() {
        currentStep++;

        // If close to target, jump directly
        if (
            currentStep >= steps - 1 ||
            Math.abs(currentImageIndex - targetIndex) <= 1
        ) {
            updateImage(targetIndex);
            startAutoRotateTimer();
            return;
        }

        // Move in the chosen direction
        let nextIndex;
        if (isClockwise) {
            nextIndex = (currentImageIndex - 1 + totalImages) % totalImages;
        } else {
            nextIndex = (currentImageIndex + 1) % totalImages;
        }

        updateImage(nextIndex);

        // Continue rotation after a delay
        setTimeout(rotateStep, 50);
    }

    // Start rotation process
    rotateStep();
}


// Add a smooth scroll feature - scroll wheel can rotate images
container?.addEventListener(
    "wheel",
    (e) => {
        e.preventDefault();

        // Dừng hiệu ứng quán tính khi người dùng sử dụng scroll wheel
        stopInertia();
        resetAutoRotateTimer();

        // Tính toán hướng di chuyển dựa trên scroll
        const direction = e.deltaY > 0 ? -1 : 1;
        const nextIndex =
            (currentImageIndex + direction + totalImages) % totalImages;
        updateImage(nextIndex);
    },
    { passive: false }
);

// Event Listeners
container?.addEventListener("mousedown", (e) => {
    if (e.target === container || e.target.tagName === "IMG") {
        startInteraction(e.clientX);
        e.preventDefault();
    }
});

document.addEventListener("mousemove", (e) => {
    if (isInteracting) {
        handleMove(e.clientX);
        e.preventDefault();
    }
});

document.addEventListener("mouseup", endInteraction);
document.addEventListener("mouseleave", endInteraction);

// Using passive: true but checking if we need to prevent default
container?.addEventListener(
    "touchstart",
    (e) => {
        if (e.target === container || e.target.tagName === "IMG") {
            startInteraction(e.touches[0].clientX);
            // We don't call preventDefault() with passive listeners
            // This improves scrolling performance
        }
    },
    { passive: true }
);

// Keep touchmove as non-passive since we need preventDefault for drag behavior
document.addEventListener(
    "touchmove",
    (e) => {
        if (isInteracting) {
            handleMove(e.touches[0].clientX);
            e.preventDefault();
        }
    },
    { passive: false }
);

document.addEventListener("touchend", endInteraction);
document.addEventListener("touchcancel", endInteraction);

// // Cleanup on page unload
window.addEventListener("beforeunload", function () {
    if (memoryOptimizationTimer) {
        clearInterval(memoryOptimizationTimer);
    }
    if (inertiaAnimationId) {
        cancelAnimationFrame(inertiaAnimationId);
    }
    if (autoRotateTimer) {
        clearTimeout(autoRotateTimer);
    }

    images.forEach((img) => {
        img.src = "";
        img.remove();
    });

    images = [];
    loadedRectangles = [];
    rectanglesData = [];
    moveHistory = [];
});


initializeViewer();

/**
 * Tìm vị trí cố định gần nhất với chỉ số hiện tại
 * @param {number} currentIndex - Chỉ số hiện tại
 * @returns {number} Chỉ số của vị trí cố định gần nhất
 */
function findNearestFixedPosition(currentIndex) {
    let nearestPosition = FIXED_POSITIONS[0];
    let minDistance = totalImages; // Khởi tạo với khoảng cách tối đa

    // Tìm vị trí gần nhất dựa trên khoảng cách vòng tròn
    FIXED_POSITIONS.forEach((position) => {
        // Tính khoảng cách theo cả hai hướng xoay (để xử lý wrap-around)
        const distance1 = Math.abs(position - currentIndex);
        const distance2 = totalImages - distance1; // Khoảng cách theo hướng ngược lại
        const minDist = Math.min(distance1, distance2);

        if (minDist < minDistance) {
            minDistance = minDist;
            nearestPosition = position;
        }
    });

    return {
        position: nearestPosition,
        distance: minDistance,
    };
}
// const mainMenuPanel = document.getElementById("mainMenuPanel");
// let itemMenu = document.querySelectorAll(".menu-item-container a");
// itemMenu.forEach((item) => {
//     item.addEventListener("click", () => {
//         const isOpening = !mainMenuPanel.classList.contains("open");
//         mainMenuPanel.classList.toggle("open", isOpening);
//     });
// });

// 
class AmenitiesLightbox {
    constructor() {
        this.lightbox = document.getElementById("lightbox");
        this.lightboxImg = document.getElementById("lightbox-img");
        this.lightboxTitle = document.getElementById("lightbox-title");
        this.currentImageSpan = document.getElementById("current-image");
        this.totalImagesSpan = document.getElementById("total-images");
        this.closeBtn = document.querySelector(".lightbox-close");
        this.prevBtn = document.querySelector(".lightbox-prev");
        this.nextBtn = document.querySelector(".lightbox-next");
        this.isReady = Boolean(
            this.lightbox &&
            this.lightboxImg &&
            this.lightboxTitle &&
            this.currentImageSpan &&
            this.totalImagesSpan &&
            this.closeBtn &&
            this.prevBtn &&
            this.nextBtn
        );
        if (!this.isReady) return;

        this.amenityCards = document.querySelectorAll(".submenu2-card.indoor");
        this.currentIndex = 0;
        this.images = [];
        this.isNavigating = false; // Prevent rapid clicks
        this.animationDirection = ""; // Track slide direction

        this.cardClickHandler = this.cardClickHandler.bind(this);

        // Bind event listeners once
        this.closeBtn.addEventListener("click", () => this.closeLightbox());
        this.prevBtn.addEventListener("click", () => this.prevImage());
        this.nextBtn.addEventListener("click", () => this.nextImage());
        this.lightbox.addEventListener("click", (e) => {
            if (e.target === this.lightbox) this.closeLightbox();
        });
        document.addEventListener("keydown", (e) => {
            if (this.lightbox.classList.contains("active")) {
                switch (e.key) {
                    case "Escape":
                        this.closeLightbox();
                        break;
                    case "ArrowLeft":
                        this.prevImage();
                        break;
                    case "ArrowRight":
                        this.nextImage();
                        break;
                }
            }
        });

        this.init();
    }

    cardClickHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        const card = e.currentTarget;
        const index = Array.from(this.amenityCards).indexOf(card);
        if (index !== -1) {
            const sceneName = card.dataset.sceneName || "";
            if (!sceneName) {
                this.openLightbox(index);
            }
        }
    }

    init() {
        if (!this.isReady) return;
        this.removeEventListeners();
        this.amenityCards = document.querySelectorAll(".submenu2-card.indoor");
        this.images = [];
        this.amenityCards.forEach((card, index) => {
            const img =
                card.querySelector("img") || card.querySelector(".card-image");
            const title =
                card.querySelector(".card-title")?.textContent || "Tiện ích";
            const sceneName = card.dataset.sceneName || "";
            if (img) {
                let imageSrc = img.src;
                if (!imageSrc && img.style.backgroundImage) {
                    imageSrc = img.style.backgroundImage.replace(
                        /url\(['"]?(.*?)['"]?\)/i,
                        "$1"
                    );
                }
                this.images.push({
                    src: imageSrc,
                    alt: img.alt || title,
                    title: title,
                    sceneName: sceneName,
                });
            }
        });
        this.totalImagesSpan.textContent = this.images.length;
        this.addEventListeners();
    }

    removeEventListeners() {
        this.amenityCards.forEach((card) => {
            card.removeEventListener("click", this.cardClickHandler);
        });
    }

    addEventListeners() {
        this.amenityCards.forEach((card) => {
            card.addEventListener("click", this.cardClickHandler);
        });
    }

    openLightbox(index) {
        this.currentIndex = index;
        this.animationDirection = ""; // No animation on open
        this.updateLightboxContent();
        this.lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    closeLightbox() {
        this.lightbox.classList.remove("active");
        document.body.style.overflow = "";
        this.lightboxImg.classList.remove("slide-left", "slide-right");
        this.lightboxTitle.classList.remove("fade-title");
    }

    prevImage() {
        if (this.isNavigating) return;
        this.isNavigating = true;
        this.animationDirection = "right"; // Slide to right (new image from left)
        this.currentIndex =
            (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateLightboxContent();
    }

    nextImage() {
        if (this.isNavigating) return;
        this.isNavigating = true;
        this.animationDirection = "left"; // Slide to left (new image from right)
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateLightboxContent();
    }

    updateLightboxContent() {
        const currentImage = this.images[this.currentIndex];

        // Apply fade effect to title
        this.lightboxTitle.classList.add("fade-title");

        // Remove existing animation classes from image
        this.lightboxImg.classList.remove("slide-left", "slide-right");

        // Apply animation class based on direction
        if (this.animationDirection) {
            this.lightboxImg.classList.add(`slide-${this.animationDirection}`);
        }

        // Update image source and attributes
        this.lightboxImg.src = currentImage.src;
        this.lightboxImg.alt = currentImage.alt;
        this.lightboxTitle.textContent = currentImage.title;
        this.currentImageSpan.textContent = this.currentIndex + 1;

        // Reset opacity for fade effect
        this.lightboxImg.style.opacity = "0";

        // Handle image load
        this.lightboxImg.onload = () => {
            this.lightboxImg.style.opacity = "1";
            const imageHeight = this.lightboxImg.offsetHeight;
            const content = document.querySelector(".lightbox-content");
            content.style.position = "relative";
            content.style.height = `${imageHeight}px`;
            this.prevBtn.style.top = "50%";
            this.nextBtn.style.top = "50%";
            this.prevBtn.style.transform = "translateY(-50%)";
            this.nextBtn.style.transform = "translateY(-50%)";
            this.isNavigating = false;
            // Clean up animation classes after transition
            setTimeout(() => {
                this.lightboxImg.classList.remove("slide-left", "slide-right");
                this.lightboxTitle.classList.remove("fade-title");
            }, 300); // Match CSS transition duration
        };

        this.lightboxImg.onerror = () => {
            this.isNavigating = false;
            this.lightboxImg.classList.remove("slide-left", "slide-right");
            this.lightboxTitle.classList.remove("fade-title");
        };
    }
}

if (document.getElementById("lightbox")) {
    window.amenitiesLightbox = new AmenitiesLightbox();
}
// let submenu2 = document.querySelectorAll(".submenu2-card.indoor");
// submenu2.forEach((item) => {
//     item.addEventListener("click", () => {
//         amenitiesLightbox.init();
//     });
// });
