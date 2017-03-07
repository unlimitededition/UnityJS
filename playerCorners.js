//JamesNicholls//
//
//	Sets both the start and end points for the game with both beihg in oppoing quadrants e.g. start=(1,-1), end=(-1,1)
//
/////////////////

//Required

//Public
public var xBounds : int = 50;
public var yBounds : int = 25;
public var spaceDistance : double = 5;
public var start : boolean = true;
//Private
//Static

function Start ()
{
	xBounds = xBounds/2;
	yBounds = yBounds/2;

	yield WaitForSeconds(0.1);
	stEnd(quadrants.quadZones);
}

function stEnd(upDown : Vector4)
{
	if(!start)
	{
		upDown = upDown*-1;
	}

	var startPos : Vector3;
	startPos = new Vector3(Random.Range(upDown.x*xBounds, upDown.y*xBounds), Random.Range(upDown.z*yBounds, upDown.w*yBounds), 0);

	var spaceDebris : GameObject[];
	spaceDebris = GameObject.FindGameObjectsWithTag("Planet");

	for(var i : int = 0; i < spaceDebris.length; i++)
	{
	    if(Vector2.Distance(startPos, spaceDebris[i].transform.position) < spaceDistance)
	    {
	    	startPos = Vector3(Random.Range(upDown.x*xBounds, upDown.y*xBounds), Random.Range(upDown.z*yBounds, upDown.w*yBounds));
	    	i = 0;
	    }
	}
	this.gameObject.transform.position = startPos;
}

//

//JamesNicholls//
//
//	Generates a random quadrants in a Vector4 format
//
/////////////////


//Required

//public
public var setQuadZones : Vector4 = new Vector4();
//private
//static
public static var quadZones : Vector4 = new Vector4();

function Start()
{
	if(setQuadZones.sqrMagnitude > 0)
	{
		quadZones = setQuadZones;
	} else {

		quadZones = oppQuad();
		setQuadZones = quadZones;
	}
}

function oppQuad() : Vector4
{
	var quadrant : int[] = new int[4];
	quadrant[0] = Random.Range(0, 2);

	if(quadrant[0] == 0)
	{
		quadrant[1] = 1;
	} else {

		quadrant[1] = 0;
	}

	quadrant[2] = Random.Range(0, 2);

	if(quadrant[2] == 0)
	{
		quadrant[3] = 1;
	} else {

		quadrant[3] = 0;
	}

	var quadrantQaud : Vector4;
	quadrantQaud = new Vector4();

	quadrantQaud.x = (-1*quadrant[0]);
	quadrantQaud.y = quadrant[1];
	quadrantQaud.z = (-1*quadrant[2]);
	quadrantQaud.w = quadrant[3];

	return quadrantQaud;
}

function Update()
{

}
