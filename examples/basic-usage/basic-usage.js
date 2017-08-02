var start = function(wpe) {

    var Stage = wpe.Stage;
    var Utils = wpe.Utils;
    var BorderView = wpe.BorderView;
    var StageUtils = wpe.StageUtils;

    var options = {w: 600, h: 600, glClearColor: 0xFF000000, useTextureAtlas: false, debugTextureAtlas: false};

    // Nodejs-specific options.
    if (Utils.isNode) {
        options.window = {title: "Usage example", fullscreen: false};
        options.supercharger = {localImagePath: __dirname};
    }

    //options.text2pngEndpoint = 'http://localhost:3457/';

    var stage = new Stage(options);

    if (!Utils.isNode) {
        document.body.appendChild(stage.getCanvas());
    }

    var texture = wpe.Tools.getRoundRect(stage, 400, 200, 10, 2, 0xFFFFFF00, true, 0xFF00FF00);
    stage.root.add([
        {tags: 'bg', clipping: false, rect: true, zIndex: 1, x: 20, y: 20, w: 560, rotation: 0.0, h: 560, colorUl: 0xFFFF0000, colorBr: 0xFFFF6666, children: [
            {tags: 'image', z: 0, shader: {type: wpe.Light3dShader}, rotation: 0.0, pivotX: 0.5, pivotY: 0.5, shaderSettings: {z: 0}, alpha: 1, src: 'http://adn.gpupdate.net/news/297192.jpg', scale: 1, y: 100, children: [
                {tag: 'borders', z: 0, shader: null, type: BorderView, borderWidth: 20, x: 150, y: -100, children: [
                    {tags: 'hello', z: 0, zIndex: -2, texture: texture}
                ]}
            ]},
            // {tags: 'hello', texture: texture, x: 10, y: 20},
            // {tag: 'borders', type: BorderView, borderWidth: 20, rect: true, w: 400, h: 200, x: 150, color: 0xAAFFFFFF, children: [
            //     {tags: 'hello2', text: {text: "hello world", fontSize: 80}, x: 10, y: 20}
            // ]}
        ]}
    ]);

    // // let animdef = stage.animations.createSettings({duration: 3, delay: 3, autostop: true, stopTimingFunction: 'linear', stopDuration: 3, actions: [
    // //     {property: ['y'], value: {0:0,1:100}},
    // //     {property: ['color'], value: {0:0xFFFFFFFF,1:0xFFFF0000}}
    // // ]});
    // // let anim = stage.animations.createAnimation(stage.root.tag('bg'), animdef);
    // // anim.start();
    //
    // // var hello2 = stage.root.tag('hello2');
    // // hello2.transition('x', {duration: 5});
    // // hello2.X = 100;
    //
    //let shader = new wpe.LightningShader(stage);
    //stage.root.tag('image').vboShader = shader;

    // stage.root.tag('image.borders').vboShader = null;

    // stage.root.tag('image.borders.hello').vboShader = shader;

    stage.root.tag('image').setSmooth('rotation', 5, {duration: 30});

    //stage.root.tag('image').setSmooth('shaderSettings.z', 0, {duration: 3});
    //stage.root.tag('image').setSmooth('shaderSettings.rx', 30, {duration: 30});

    //stage.root.tag('image.borders').shaderSettings.z = -1;
    //stage.root.tag('image.borders').setTval('shaderSettings.rx', -10, {duration: 3, merger: StageUtils.mergeNumbers});

    // let lightBouncer = stage.root.tag('image').animation({duration: 1, repeat: -1, actions: [
    //     {p: 'shader.z', merger: StageUtils.mergeNumbers, v: {0: 0.1, 0.5: 0.8, 1: 0.1}}
    // ]});
    // lightBouncer.start();

    //stage.root.tag('image').setTval('vboShader.strength', 5, {duration: 10, merger: StageUtils.mergeNumbers});
    //
    // setTimeout(function() {
    //     let anim2 = stage.animations.createAnimation(stage.root.tag('hello2'), animdef);
    //     anim2.start();
    //
    // }, 500);
};

if (typeof window === "undefined") {
    // Nodejs: start.
    start(require('../../wpe'));
}
