//JamesNicholls//
//
//	Calculates change in finger position and applies impulse
//
/////////////////

//Required

//Public
public var floatingDirection : Vector3 = new Vector3();
public var planetTag : String = "Planet";
public var gravityFalloff : float = 3;
//Private
private var planetCollection : GameObject[];
private var shipMass : double = 1;
//Static

function Start()
{
	planetCollection = GameObject.FindGameObjectsWithTag(planetTag);
}

function Update()
{
	if(impulseControlls.fired)
	{
		if(impulseControlls.touchDelta.sqrMagnitude > 0)
		{
			floatingDirection+=impulseControlls.touchDelta;
			impulseControlls.touchDelta = Vector2.zero;
		}
		floatingDirection+=accumilateForces();
		floating(floatingDirection);
	}
}

function accumilateForces() : Vector3
{
	var totalEffect : Vector3 = new Vector3(0, 0, 0);

	for(var planetCollected : GameObject in planetCollection)
	{
		var planetData : planet;
		planetData = planetCollected.gameObject.GetComponent(planet);

		var gravDir : Vector3 = new Vector3();
		gravDir = planetCollected.transform.position-this.transform.position;

		var gravityInfluence : Vector3;
		gravityInfluence = new Vector3((gravDir.normalized.x/(gravityFalloff*gravDir.sqrMagnitude))*planetData.Mass, (gravDir.normalized.y/(gravityFalloff*gravDir.sqrMagnitude))*planetData.Mass, (gravDir.normalized.z/(gravityFalloff*gravDir.sqrMagnitude))*planetData.Mass);

		totalEffect+=gravityInfluence;
	}
	return totalEffect;
}

function floating(floatForce : Vector3)
{
	transform.Translate(floatForce*Time.smoothDeltaTime);
}

//

//Required

//Public
public var slingshotObject : GameObject;
public var maxImpulse : float = 5;
//Private
private var touchBegin : Vector2 = new Vector2();
private var touchDeltaEnd : Vector2 = new Vector2();
private var powerDir : LineRenderer;
//Static
public static var fired : boolean = false;
public static var touchDelta : Vector2 = new Vector2();


function Start ()
{
	fired = false;
	drawLine();
}

function drawLine()
{
	powerDir = slingshotObject.AddComponent.<LineRenderer>();
	powerDir.enabled = false;
	powerDir.SetWidth(0.1,0.1);
	powerDir.SetVertexCount(2);
}

function Update ()
{
	sling();
}

function sling()
{
	if(!fired)
	{
		if(Input.touchCount == 1)
		{
			powerDir.SetPosition(0, slingshotObject.transform.position);

			if(Input.GetTouch(0).phase == TouchPhase.Began)
			{
				powerDir.enabled = true;
				touchBegin = Input.GetTouch(0).position;
			}

			if(Input.GetTouch(0).phase == TouchPhase.Moved || Input.GetTouch(0).phase == TouchPhase.Stationary)
			{
				var setImpulse : float;

				touchDelta = Input.GetTouch(0).position-touchBegin;

				if(touchDelta.magnitude < maxImpulse)
				{
					setImpulse = touchDelta.magnitude;
				} else {

					setImpulse = maxImpulse;
				}

				touchDeltaEnd = slingshotObject.transform.position+touchDelta;

				powerDir.SetPosition(1, touchDeltaEnd);
			}

			if(Input.GetTouch(0).phase == TouchPhase.Ended)
			{
				powerDir.enabled = false;
				touchDeltaEnd = Vector3.zero;
				fired = true;
			}
		}
	}
}
