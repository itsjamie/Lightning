import C2dCoreQuadList from "./C2dCoreQuadList.mjs";
import C2dCoreQuadOperation from "./C2dCoreQuadOperation.mjs";
import C2dCoreRenderExecutor from "./C2dCoreRenderExecutor.mjs";
import CoreRenderState from "../../tree/core/CoreRenderState.mjs";
import DefaultShader from "./shaders/DefaultShader.mjs";
import C2dShader from "./C2dShader.mjs";
import Renderer from "../Renderer.mjs";

export default class C2dRenderer extends Renderer {

    constructor(stage) {
        super(stage);

        this.setupC2d(this.stage.c2d.canvas);
    }

    destroy() {
        this._tintTexture = undefined;
    }

    _createDefaultShader(ctx) {
        return new DefaultShader(ctx);
    }

    _getShaderBaseType() {
        return C2dShader
    }

    _getShaderAlternative(shaderType) {
        return shaderType.getC2d && shaderType.getC2d();
    }

    createCoreQuadList(ctx) {
        return new C2dCoreQuadList(ctx);
    }

    createCoreQuadOperation(ctx, shader, shaderOwner, renderTextureInfo, scissor, index) {
        return new C2dCoreQuadOperation(ctx, shader, shaderOwner, renderTextureInfo, scissor, index);
    }

    createCoreRenderExecutor(ctx) {
        return new C2dCoreRenderExecutor(ctx);
    }
    
    createCoreRenderState(ctx) {
        return new CoreRenderState(ctx);
    }

    createRenderTexture(w, h, pw, ph) {
        const canvas = document.createElement('canvas');
        canvas.width = pw;
        canvas.height = ph;
        this.setupC2d(canvas);
        return canvas;
    }
    
    freeRenderTexture(glTexture) {
    }


    uploadTextureSource(textureSource, options) {
        // For canvas, we do not need to upload.
        if (options.source.buffer) {
            // Convert RGBA buffer to canvas.
            const canvas = document.createElement('canvas');
            canvas.width = options.w;
            canvas.height = options.h;

            const imageData = new ImageData(new Uint8ClampedArray(options.source.buffer), options.w, options.h);
            canvas.getContext('2d').putImageData(imageData, 0, 0);
            return canvas;
        }

        return options.source;
    }

    freeTextureSource(textureSource) {
    }

    addQuad(renderState, quads, index) {
        // Render context changes while traversing so we save it by ref.
        const viewCore = quads.quadViews[index];
        quads.setRenderContext(index, viewCore._renderContext);
        quads.setWhite(index, viewCore.isWhite());
        quads.setSimpleTc(index, viewCore.hasSimpleTexCoords());
    }

    isRenderTextureReusable(renderState, renderTextureInfo) {
        // @todo: check render coords/matrix, maybe move this to core?
        return false;
    }

    finishRenderState(renderState) {
    }

    setupC2d(canvas) {
        const ctx = canvas.getContext('2d');
        canvas.ctx = ctx;

        ctx._scissor = null;

        // Save base state so we can restore the defaults later.
        canvas.ctx.save();
    }

    getPatchId() {
        return "c2d";
    }

    getTintTexture(w, h) {
        if (!this._tintTexture) {
            const tempTexture = document.createElement('canvas');
            tempTexture.width = Math.ceil(1024);
            tempTexture.height = Math.ceil(1024);
            tempTexture.ctx = tempTexture.getContext('2d');
            this._tintTexture = tempTexture;
        } else {
            this._tintTexture.ctx.clearRect(0, 0, w, h);
        }

        return this._tintTexture;
    }
}
