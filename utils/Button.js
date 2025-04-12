export default function addButton(width, height, txt, posX, posY) {
    // add a parent background object
    const btn = add([
        rect(width, height, { radius: 8 }),
        pos(posX, posY),
        area(),
        scale(1),
        anchor("center"),
        outline(4),
        fixed(true),
        color(255,255,255),
        z(10)
    ]);

    // add a child object that displays the text
    btn.add([
        text(txt),
        anchor("center"),
        color(0, 0, 0),
    ]);

    // onHoverUpdate() comes from area() component
    // it runs every frame when the object is being hovered
    btn.onHoverUpdate(() => {
        const t = time() * 10;
        btn.color = hsl2rgb((t / 10) % 1, 0.6, 0.7);
        btn.scale = vec2(1.2);
        setCursor("pointer");
    });

    // onHoverEnd() comes from area() component
    // it runs once when the object stopped being hovered
    btn.onHoverEnd(() => {
        btn.scale = vec2(1);
        btn.color = rgb();
    });

    // onClick() comes from area() component
    // it runs once when the object is clicked
    btn.onClick((f) => f);

    return btn;
}