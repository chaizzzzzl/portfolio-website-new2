// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 果冻滚动效果
let lastScrollY = window.scrollY;
let ticking = false;

function applyJellyEffect() {
    const scrollY = window.scrollY;
    const scrollDiff = scrollY - lastScrollY;
    const mainContent = document.querySelector('.main-content');
    
    if (mainContent) {
        const jellyAmount = Math.min(Math.abs(scrollDiff) * 0.05, 10);
        const direction = scrollDiff > 0 ? 1 : -1;
        
        mainContent.style.transform = `translateY(${direction * jellyAmount}px)`;
        
        setTimeout(() => {
            mainContent.style.transform = 'translateY(0)';
        }, 600);
    }
    
    lastScrollY = scrollY;
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(applyJellyEffect);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 滚动渐显效果
const fadeElements = document.querySelectorAll('.fade-in, .scroll-animate');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.add('animated');
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    fadeInObserver.observe(element);
});

// 为作品卡片添加悬停效果
const workCards = document.querySelectorAll('.work-card');
workCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// 为导航链接添加点击效果
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        // 移除所有链接的激活状态
        navLinks.forEach(item => item.classList.remove('active'));
        // 添加当前链接的激活状态
        this.classList.add('active');
    });
});

// 为页面元素添加进入动画
function animateOnLoad() {
    const elements = document.querySelectorAll('.hero-content, .about, .works');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 300);
    });
}

// 页面加载时执行
window.addEventListener('load', animateOnLoad);

// 作品卡片点击事件 - 已移除跳转功能

// 图片查看模态框
const modal = document.getElementById('imageModal');
const modalImage = document.querySelector('.modal-image');
const closeBtn = document.querySelector('.close');

// 打开模态框
function openModal(imgSrc) {
    modal.style.display = 'block';
    modalImage.src = imgSrc;
}

// 关闭模态框
function closeModal() {
    modal.style.display = 'none';
}

// 点击关闭按钮
closeBtn.addEventListener('click', closeModal);

// 点击模态框外部关闭
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

// 所有子页面相关功能已移除

// 为作品图片添加点击查看大图功能
function setupImageClickEvents() {
    const workImages = document.querySelectorAll('.work-image img');
    workImages.forEach(img => {
        // 移除可能存在的旧事件监听器
        img.removeEventListener('click', handleImageClick);
        // 添加新的事件监听器
        img.addEventListener('click', handleImageClick);
        // 添加光标样式
        img.style.cursor = 'zoom-in';
    });
}

function handleImageClick(e) {
    e.stopPropagation(); // 阻止事件冒泡
    
    // 获取图片的位置和尺寸
    const img = this;
    const rect = img.getBoundingClientRect();
    const originalWidth = rect.width;
    const originalHeight = rect.height;
    
    // 创建覆盖层
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    overlay.style.zIndex = '3000';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.cursor = 'zoom-out';
    
    // 创建放大的图片
    const enlargedImg = document.createElement('img');
    enlargedImg.src = img.src;
    enlargedImg.style.width = `${originalWidth}px`;
    enlargedImg.style.height = `${originalHeight}px`;
    enlargedImg.style.objectFit = 'contain';
    enlargedImg.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    enlargedImg.style.maxWidth = '90vw';
    enlargedImg.style.maxHeight = '90vh';
    
    // 添加到页面
    document.body.appendChild(overlay);
    overlay.appendChild(enlargedImg);
    
    // 防止页面滚动
    document.body.style.overflow = 'hidden';
    
    // 触发重排
    void enlargedImg.offsetWidth;
    
    // 放大图片到四倍大小
    const enlargedWidth = originalWidth * 4;
    const enlargedHeight = originalHeight * 4;
    
    enlargedImg.style.width = `${enlargedWidth}px`;
    enlargedImg.style.height = `${enlargedHeight}px`;
    
    // 点击关闭
    function closeOverlay() {
        // 缩小图片
        enlargedImg.style.width = `${originalWidth}px`;
        enlargedImg.style.height = `${originalHeight}px`;
        
        // 动画结束后移除元素
        setTimeout(() => {
            document.body.removeChild(overlay);
            document.body.style.overflow = '';
        }, 500);
    }
    
    overlay.addEventListener('click', closeOverlay);
    enlargedImg.addEventListener('click', closeOverlay);
}

// 页面加载完成后设置事件监听器
window.addEventListener('load', setupImageClickEvents);

// 当DOM结构变化时重新设置事件监听器
const observer = new MutationObserver(setupImageClickEvents);
observer.observe(document.body, { childList: true, subtree: true });

// 导航链接激活状态
const currentPath = window.location.pathname;

navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});