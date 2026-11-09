gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

let smoother = ScrollSmoother.create({
    smooth: 2
});

const scaleImage = () => {
    const image = document.querySelector(".image-scale__right img");
    const imageWrapper = document.querySelector(".image-scale__right");
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".image-scale__section",
            start: "top top",
            pin: true,
            end: "+=1500",
            scrub: true
        }
    });

    tl.to("h2 span", {
        duration: 90,
        textContent: "97",
        snap: { textContent: 1 }
    })
        .to(
            "h2",
            {
                duration: 60,
                color: "#91a052"
            },
            0
        )
        .to(
            imageWrapper,
            {
                xPercent: 50,
                duration: 20
            },
            0
        )
        .to(
            image,
            {
                xPercent: -40,
                duration: 20
            },
            0
        )
        .to(
            image,
            {
                transformOrigin: "bottom center",
                scale: 0.9,
                duration: 70
            },
            30
        )
        .to(
            ".box--one",
            {
                scaleY: 1,
                duration: 10
            },
            30
        )
        .to(
            ".box--two",
            {
                scaleX: 1,
                duration: 10
            },
            40
        )
        .to(
            ".box--three",
            {
                scaleY: 0.7,
                duration: 10
            },
            50
        )
        .to(
            ".box--four",
            {
                scaleX: 1,
                duration: 10
            },
            60
        );

    return tl;
};

const master = gsap.timeline();

master.add(scaleImage(".image-scale__right"));
