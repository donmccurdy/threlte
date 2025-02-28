<script lang="ts">
  import { useRender, useThrelte } from '@threlte/core'
  import {
    BlendFunction,
    BloomEffect,
    BrightnessContrastEffect,
    ChromaticAberrationEffect,
    EffectComposer,
    EffectPass,
    FXAAEffect,
    RenderPass,
    ToneMappingEffect,
    ToneMappingMode
  } from 'postprocessing'
  import { StaticNoiseEffect } from './StaticNoise/StaticNoise'

  /**
   * Chromatic Aberration
   */
  const chromaticAberrationEffect = new ChromaticAberrationEffect()
  chromaticAberrationEffect.offset.x = 0.0008
  chromaticAberrationEffect.offset.y = 0

  /**
   * Tone Mapping
   */
  const toneMappingEffect = new ToneMappingEffect({
    mode: ToneMappingMode.ACES_FILMIC
  })

  /**
   * Noise
   */
  const noiseEffect = new StaticNoiseEffect({
    blendFunction: BlendFunction.COLOR_DODGE
  })
  noiseEffect.blendMode.opacity.value = 0.07

  /**
   * Anti-aliasing
   */
  const fxaaEffect = new FXAAEffect()

  /**
   * Brightness/Contrast
   */
  const bcEffect = new BrightnessContrastEffect()
  bcEffect.contrast = 0.1
  bcEffect.brightness = -0.1

  /**
   * Bloom
   */
  const bloomEffect = new BloomEffect({
    luminanceThreshold: 0.1,
    radius: 0.86,
    mipmapBlur: true,
    intensity: 8
  })

  const { renderer, scene, camera } = useThrelte()

  const composer = new EffectComposer(renderer)

  const setup = () => {
    composer.removeAllPasses()
    composer.addPass(new RenderPass(scene, camera.current))
    composer.addPass(new EffectPass(camera.current, fxaaEffect))
    composer.addPass(new EffectPass(camera.current, bloomEffect, noiseEffect, toneMappingEffect))
  }

  $: $camera && setup()

  useRender(() => {
    composer.render()
  })

  const { size } = useThrelte()
  $: composer.setSize($size.width, $size.height)
</script>
