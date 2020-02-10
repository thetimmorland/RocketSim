import math

import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel
from scipy.integrate import cumtrapz, odeint

app = FastAPI()

DRAG_COEFFICIENTS = {
    'abs': 0.25,
    'aluminum': 1.4,
    'cardboard': 0.072,
    'wood': 0.4,
}

STD_GRAVITY = 9.80665
AIR_DENSITY = 1.225


class Rocket(BaseModel):
    bodyDiameter: float
    bodyLength: float
    bodyMass: float
    bodyMaterial: str
    finCount: int
    finHeight: float
    finMass: float
    finMaterial: str
    finSweep: float
    motorBurnTime: float
    motorImpulse: float
    motorMass: float
    noseDiameter: float
    noseLength: float
    noseMass: float
    noseMaterial: str


@app.post("/api")
def simulate(rocket: Rocket):

    exhaustVelocity = STD_GRAVITY * rocket.motorImpulse

    initialNetMass = sum([rocket.bodyMass, rocket.finMass,
                        rocket.motorMass, rocket.noseMass])

    finalNetMass = initialNetMass - rocket.motorMass

    dragCoefficients = {}
    dragCoefficients['body'] = rocket.bodyDiameter * rocket.bodyLength \
        * DRAG_COEFFICIENTS[rocket.bodyMaterial]

    dragCoefficients['fins'] = 2 * rocket.finCount * rocket.finHeight**2 \
        * math.sin(rocket.finSweep) * DRAG_COEFFICIENTS[rocket.finMaterial]

    noseRadius = rocket.noseDiameter / 2
    dragCoefficients['nose'] = math.pi * noseRadius \
        * math.sqrt(rocket.noseLength**2 + noseRadius**2) \
        * DRAG_COEFFICIENTS[rocket.noseMaterial]

    totalDragCoefficient = sum(dragCoefficients.values())

    def model(t, v):
        dvdt = exhaustVelocity \
            * math.log(initialNetMass / finalNetMass) \
            - STD_GRAVITY - (AIR_DENSITY * v**2 * totalDragCoefficient)

        return dvdt

    t = np.linspace(0, 100, num = 100 * 100)
    v = odeint(model, 0, t).flatten()

    altitude=cumtrapz(v, x = t)
    altitude=[a for a in altitude if a > 0]
    return list(zip(t.tolist(), altitude))
