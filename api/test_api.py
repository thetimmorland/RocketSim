from backend import app
from starlette.testclient import TestClient

client = TestClient(app)


def test_post():

    rocket = {
        "bodyDiameter": 0.1,
        "bodyLength": 0.1,
        "bodyMass": 0.1,
        "bodyMaterial": "abs",
        "finCount": 1,
        "finHeight": 0.1,
        "finMass": 0.1,
        "finMaterial": "abs",
        "finSweep": 0.1,
        "motorBurnTime": 0.1,
        "motorImpulse": 0.1,
        "motorMass": 0.1,
        "noseDiameter": 0.1,
        "noseLength": 0.1,
        "noseMass": 0.1,
        "noseMaterial": "abs",
    }

    response = client.post("/api", json=rocket)
    print(response.content)
    assert response.status_code == 200
