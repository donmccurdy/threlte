import type { RevoluteImpulseJoint } from '@dimforge/rapier3d-compat'
import type { Position } from '@threlte/core'
import { positionToVector3 } from '../lib/positionToVector3'
import { useJoint } from './useJoint'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useRevoluteJoint = (
  localAnchorA: Position,
  localAnchorB: Position,
  axis: Position,
  limits?: [min: number, max: number]
) => {
  return useJoint(([rbA, rbB], { world, rapier }) => {
    const params = rapier.JointData.revolute(
      positionToVector3(localAnchorA),
      positionToVector3(localAnchorB),
      positionToVector3(axis).normalize()
    )
    if (limits) {
      params.limitsEnabled = true
      params.limits = limits
    }
    return world.createImpulseJoint(params, rbA, rbB, true) as RevoluteImpulseJoint
  })
}
