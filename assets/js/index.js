$(document).ready(function () {
    // Typing Animation
    const typed = $("#typed");
    const strings = ["Digital Wizard", "Code Alchemist", "Design Maverick"];
    let i = 0;
    let currentString = [];
    let isDeleting = false;

    function type() {
        const fullText = strings[i];
        if (isDeleting) {
            currentString.pop();
        } else {
            currentString.push(fullText[currentString.length]);
        }

        typed.text(currentString.join(""));

        if (!isDeleting && currentString.length === fullText.length) {
            setTimeout(() => (isDeleting = true), 1000);
        } else if (isDeleting && currentString.length === 0) {
            isDeleting = false;
            i = (i + 1) % strings.length;
        }

        const speed = isDeleting ? 50 : 100;
        setTimeout(type, speed);
    }

    type();

    // Progress Bar Animation
    function animateProgressBars() {
        $(".progress-bar").each(function () {
            const width = $(this).data("width");
            $(this).css("width", "0").animate({ width: width + "%" }, 1500, "easeInOutExpo");
        });
    }

    let progressBarsAnimated = false; // Flag to prevent multiple animations
    // Counter Animation
    function animateCounters() {
        $(".counter").each(function () {
            const $this = $(this);
            const target = $this.data("target");
            $({ count: 0 }).animate(
                { count: target },
                {
                    duration: 2000,
                    easing: "easeInOutExpo",
                    step: function () {
                        $this.text(Math.floor(this.count));
                    },
                    complete: function () {
                        $this.text(this.count);
                    }
                }
            );
        });
    }

    let countersAnimated = false; // Flag to prevent multiple animations

    // Combined Scroll Event Handler (Progress Bars, Counters, Back to Top)
    $(window).scroll(function () {
        const windowTop = $(window).scrollTop();
        const windowHeight = $(window).height();

        //Progress bar Code
        const aboutSection = $("#about").offset().top;
        if (windowTop + windowHeight > aboutSection && !progressBarsAnimated) {
            animateProgressBars();
            progressBarsAnimated = true; // Set the flag
        }

        const clientsSection = $("#clients").offset().top;
        if (windowTop + windowHeight > clientsSection && !countersAnimated) {
            animateCounters();
            countersAnimated = true; // Set the flag
        }

        // Back to Top Button
        if (windowTop > 200) {
            $("#backToTop").removeClass("d-none");
        } else {
            $("#backToTop").addClass("d-none");
        }
    });

    // Back to Top Button Click Handler
    $("#backToTop a").click(function (e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, 800, "easeInOutExpo"); // Smoother easing
    });

    // Contact Form Submission
    $("#contactForm").submit(function (e) {
        e.preventDefault();
        const form = $(this);
        $.ajax({
            url: form.attr("action"),
            type: "POST",
            data: form.serialize(),
            dataType: "json",
            success: function (response) {
                $("#formMessage").html(response.message).css("color", response.status === "success" ? "green" : "red");
                if (response.status === "success") form[0].reset();
            },
            error: function () {
                $("#formMessage").html("Something went wrong. Please try again.").css("color", "red");
            }
        });
    });
});