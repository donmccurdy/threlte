<script lang="ts">
  import { T } from '@threlte/core'
  import { injectLookAtPlugin } from '../../plugins/lookAt/lookAtPlugin'
  import { DoubleSide } from 'three'
  import Character from './Character.svelte'

  injectLookAtPlugin()
</script>

<T.PerspectiveCamera
  makeDefault
  position={[-0.85, 1.75, 2.46]}
  lookAt={[0, 1, 0]}
/>

<T.AmbientLight />
<T.DirectionalLight position={[10, 5, 5]} />

<Character />

<T.Mesh rotation.x={-90 * (Math.PI / 180)}>
  <T.CircleGeometry args={[3, 72]} />
  <T.MeshStandardMaterial
    side={DoubleSide}
    color={'white'}
  />
</T.Mesh>
