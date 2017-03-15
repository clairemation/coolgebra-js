# coolgebra-js

Vectors are represented by arrays.
	[x,y,z,w]
  
Wrap the first vector in your sequence with $().
	$([x,y,z])
Chain as many operators as you want.
End the sequence with .$$
	$([1,1]).plus(3).times([4,5]).rotate(1,2).unit().$$
	==> [-0.9019371851463437, 0.4318672412331016]

You can nest operations:
	$([3,4]).plus($([1,1]).times(3).$$).$$
as long as each nested sequence begins and ends with $() and .$$.
