import System.Collections.Generic;

//JamesNicholls//
//
//	Generates a cross-hair pattern from game objects e.g.Cube objects, Plane objects, etc...
//
/////////////////

//Required

//Public
//public var gridObject : GameObject;
public var gridXbounds : int = 10;
public var gridYbounds : int = 10;
//public var maxGridCount : int = 100;
public var gridScale : double = 0.5;
public var gridMarkers : List.<gridPoints> = new List.<gridPoints>();
//Private
//Static

function Start()
{
	createGrid();
}

function Update()
{

}

function createGrid()
{
	var gridScaleSize : Vector3;
	gridScaleSize = new Vector3(gridScale, gridScale, gridScale);

	var maxGridCountX : int;
	maxGridCountX = (gridXbounds*gridScale)+1;

	var maxGridCountY : int;
	maxGridCountY = (gridYbounds*gridScale)+1;

	for(var ix : int = 0; ix<maxGridCountX; ix++)
	{
		var rightGrid : GameObject  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		rightGrid.transform.position = new Vector3(ix+1, 0, 0);
		rightGrid.transform.position = rightGrid.transform.position*gridScale;
		rightGrid.transform.parent = this.gameObject.transform;
		rightGrid.transform.localScale = gridScaleSize;

		var leftGrid : GameObject  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		leftGrid.transform.position = new Vector3(-ix-1, 0, 0);
		leftGrid.transform.position = leftGrid.transform.position*gridScale;
		leftGrid.transform.parent = this.gameObject.transform;
		leftGrid.transform.localScale = gridScaleSize;
	}

	for(var iy : int = 0; iy<maxGridCountY; iy++)
	{
		var upGrid : GameObject  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		upGrid.transform.position = new Vector3(0, iy+1, 0);
		upGrid.transform.position = upGrid.transform.position*gridScale;
		upGrid.transform.parent = this.gameObject.transform;
		upGrid.transform.localScale = gridScaleSize;

		var downGrid : GameObject  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		downGrid.transform.position = new Vector3(0, -iy-1, 0);
		downGrid.transform.position = downGrid.transform.position*gridScale;
		downGrid.transform.parent = this.gameObject.transform;
		downGrid.transform.localScale = gridScaleSize;
	}

	for(var j : int = 0; j<gridMarkers.Count; j++)
	{
		var gridPointsXTotal : int;
		gridPointsXTotal = maxGridCountX/gridMarkers[j].gridIndex;


		var gridPointsYTotal : int;
		gridPointsYTotal = maxGridCountY/gridMarkers[j].gridIndex;
		//Debug.Log(gridPointsTotal);

		for(var kx : int = 0; kx<gridPointsXTotal; kx++)
		{
			for(var lx : int = 0; lx<gridMarkers[j].gridIndexWidth; lx++)
			{
				var gridNthX : int;
				gridNthX = kx*gridMarkers[j].gridIndex;

				var subRightGridPlu : GameObject  = GameObject.CreatePrimitive(PrimitiveType.Cube);
				subRightGridPlu.transform.position = new Vector3(gridNthX, (lx+1), 0);
				subRightGridPlu.transform.position = subRightGridPlu.transform.position*gridScale;
				subRightGridPlu.transform.parent = this.gameObject.transform;
				subRightGridPlu.transform.localScale = gridScaleSize;

				var subRightGridMin : GameObject  = GameObject.CreatePrimitive(PrimitiveType.Cube);
				subRightGridMin.transform.position = new Vector3(gridNthX, -(lx+1), 0);
				subRightGridMin.transform.position = subRightGridMin.transform.position*gridScale;
				subRightGridMin.transform.parent = this.gameObject.transform;
				subRightGridMin.transform.localScale = gridScaleSize;

				var subLeftGridPlu : GameObject  = GameObject.CreatePrimitive(PrimitiveType.Cube);
				subLeftGridPlu.transform.position = new Vector3(-gridNthX, (lx+1), 0);
				subLeftGridPlu.transform.position = subLeftGridPlu.transform.position*gridScale;
				subLeftGridPlu.transform.parent = this.gameObject.transform;
				subLeftGridPlu.transform.localScale = gridScaleSize;

				var subLeftGridMin : GameObject  = GameObject.CreatePrimitive(PrimitiveType.Cube);
				subLeftGridMin.transform.position = new Vector3(-gridNthX, -(lx+1), 0);
				subLeftGridMin.transform.position = subLeftGridMin.transform.position*gridScale;
				subLeftGridMin.transform.parent = this.gameObject.transform;
				subLeftGridMin.transform.localScale = gridScaleSize;
			}

			for(var ky : int = 0; ky<gridPointsYTotal; ky++)
			{
				for(var ly : int = 0; ly<gridMarkers[j].gridIndexWidth; ly++)
				{
					var gridNthY : int;
					gridNthY = ky*gridMarkers[j].gridIndex;
					
					var subUpGridPlu : GameObject  = GameObject.CreatePrimitive(PrimitiveType.Cube);
					subUpGridPlu.transform.position = new Vector3((ly+1), gridNthY, 0);
					subUpGridPlu.transform.position = subUpGridPlu.transform.position*gridScale;
					subUpGridPlu.transform.parent = this.gameObject.transform;
					subUpGridPlu.transform.localScale = gridScaleSize;

					var subUpGridMin : GameObject  = GameObject.CreatePrimitive(PrimitiveType.Cube);
					subUpGridMin.transform.position = new Vector3(-(ly+1), gridNthY, 0);
					subUpGridMin.transform.position = subUpGridMin.transform.position*gridScale;
					subUpGridMin.transform.parent = this.gameObject.transform;
					subUpGridMin.transform.localScale = gridScaleSize;

					var subDownGridPlu : GameObject  = GameObject.CreatePrimitive(PrimitiveType.Cube);
					subDownGridPlu.transform.position = new Vector3((ly+1), -gridNthY, 0);
					subDownGridPlu.transform.position = subDownGridPlu.transform.position*gridScale;
					subDownGridPlu.transform.parent = this.gameObject.transform;
					subDownGridPlu.transform.localScale = gridScaleSize;

					var subDownGridMin : GameObject  = GameObject.CreatePrimitive(PrimitiveType.Cube);
					subDownGridMin.transform.position = new Vector3(-(ly+1), -gridNthY, 0);
					subDownGridMin.transform.position = subDownGridMin.transform.position*gridScale;
					subDownGridMin.transform.parent = this.gameObject.transform;
					subDownGridMin.transform.localScale = gridScaleSize;
				}
			}
		}
	}
}

//Classes

class gridPoints
{
	public var gridIndex : int = 5;
	public var gridIndexWidth : int = 3;
}
