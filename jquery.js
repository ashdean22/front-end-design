$(document).ready(function() {
    // Initially hide all elements that should fade in
    $('.header, .topnav, .div2, .div3, .div4, .div5, .div6, .div7, .div8').hide();

    // Fade in header and nav immediately
    $('.header').fadeIn(1000);
    $('.topnav').delay(500).fadeIn(1000);

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to animate element with fade
    function animateElement(element, delay) {
        $(element).delay(delay).fadeIn(800).animate({
            opacity: 1,
            top: 0
        }, {
            duration: 600,
            step: function(now, fx) {
                if (fx.prop === "top") {
                    $(this).css('transform', `translateY(${50 - (now * 50)}px)`);
                }
            }
        });
    }

    // Check elements on scroll
    $(window).on('scroll', function() {
        $('.div2, .div3, .div4, .div5, .div6, .div7, .div8').each(function(index) {
            if (isInViewport(this) && $(this).css('opacity') === '0') {
                animateElement(this, index * 200); // 200ms delay between each element
            }
        });
    });

    // Initial check for visible elements
    $(window).trigger('scroll');
});
