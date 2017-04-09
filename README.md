4/9/2017: Fixed some bugs, added features including cross product, angle between two vectors, scalar projection, rotation to a plane as specified by its normal vector, and determining which side of a given line segment a (point) vector is on.

# coolgebra-js

A performant and expressive library for client-end complex vector and matrix calculations. I wrote Coolgebra because I wanted an easy-to-use syntax for chaining and nesting operations, but without incurring the overhead of creating a whole new object with every intermediate step.

The syntax is designed to feel as if you were using a library like Sylvester, but behind the scenes, all results are stored as plain arrays in a single module-scoped stack. The module exposes a singleton containing all the methods, which all return itself.

Coolgebra is a work in progress. It is written in ES6 and may need to be transpiled for browser environments. Require it in your build and assign it to the $ variable (see below about using a different variable).

Further optimizations could include:
- object pooling the arrays
- adding syntax to use only specialized methods for the given vector/matrix size

# API

Vector/matrix parameters are represented by arrays.
<br/>([x,y,z,w])
  
Prepend the first argument in your sequence with the start tag $ (actually, whatever variable you have assigned Coolgebra to).
<br/>$([x,y,z])

Chain as many operations as you want.
<br/>Terminate the sequence with the end tag .$.
<br/>$([1,1]).plus(3).times([4,5]).rotate(0.33).unit().$
<br/>==> [-0.9019371851463437, 0.4318672412331016]

You can nest operations:
<br/>$([3,4]).plus  **($([1,1]).times(3).$)**  .$

as long as each nested sequence begins with the start tag and terminates with the end tag.
(Spaces added for clarity, delete in actual code.)

Note: If $ is already assigned in your code, you can assign coolgebra.js (and thereby the prefix tag) to any variable you want. To change the end tag, edit the END_TAG constant in line 1 of coolgebra.js.

# Operations

Vectors can have from 2 to 4 elements. Matrices are only 4x4.

**Addition**
---

- **plus:**

**$([a1, a2, a3, a4]).plus(b).$  
$([a1, a2, a3, a4]).plus([b1, b2, b3, b4]).$**

`$([1,2,3,4]).plus(1).$  
   // --> [2,3,4,5]`
   
`$([1,2,3,4]).plus([4,3,2,1]).$  
   // --> [5,5,5,5]`

- **plusScalar:**  
*faster than generic 'plus'*

**$([a1, a2, a3, a4]).plusScalar(b).$**

`$([1,2,3,4]).plusScalar(1).$  
   // --> [2,3,4,5]  `

- **plusVector:**  
   *faster than generic 'plus'*

**$([a1, a2, a3, a4]).plus([b1, b2, b3, b4]).$**
   
`$([1,2,3,4]).plusVector([4,3,2,1]).$  
   // --> [5,5,5,5] ` 
   
**Subtraction:**
---

- **minusVector:**

**$([a1, a2, a3, a4]).minusVector([b1, b2, b3, b4]).$**

`$([1,2,3,4]).minusVector([4,3,2,1]).$  
   // --> [-3, -1, 1, 3]`

**Multiplication:**
---

- **times:**

**$([a1, a2, a3, a4]).plus(b)  
$([a1, a2, a3, a4]).plus([b1, b2, b3, b4]).$**

`$([1,2,3,4]).times(2).$  
   // --> [2, 4, 6, 8]`
   
`$([1,2,3,4]).times([1,2,3,4]).$  
   // --> [1,4,9,16]`
   
- **timesScalar**  
*faster than genertic 'times'*
   
**$([a1, a2, a3, a4]).timesScalar(b).$**

`$([1,2,3,4]).timesScalar(2).$  
   // --> [2,4,6,8]  `
 
- **timesVector:**  
   *faster than generic 'times'*

**$([a1, a2, a3, a4]).times([b1, b2, b3, b4]).$** 
 
`$([1,2,3,4]).timesVector([1,2,3,4]).$  
   // --> [1,4,9,16]  `
   
**Division:**
---

following the same pattern:
- divideBy
- divideByScalar
- divideByVector

**Mix / blend / interpolate / weighted average:**
---
*good for blending colors represented as [r,g,b] or [r,g,b,a]*

- **mix:**

**$(a).mix(b, t).$**  

The argument t is optional and specifies the degree of mixing.  
0 = completely a  
1 = completely b  
If left out, t defaults to 0.5 (a 50%/50% mix)  

`$([1,2,3,4]).mix([4,3,2,1], 0.25).$  
   // --> [1.75, 2.25, 2.75, 3.25]`

**Dot product:**
---

- **dot:**

**$([a1, a2, a3, a4]).dot([b1, b2, b3, b4]).$**

`$([1,2,3,4]).dot([4,3,2,1]).$   
   // --> 20`

**Length**
---

- **length:**

**$([a1, a2, a3, a4]).length().$**

`$([1,2,3,4]).length().$  
   // --> 5.477225575051661`
   
- **squared length:**  
*faster than 'length', use if you only need it for comparision*

**$([a1, a2, a3, a4]).squaredLength().$**   
   
`$([1,2,3,4]).squaredLength().$  
   // --> 30  `
   
**Distance:**
---
   
- **distance:**

**$([a1, a2, a3, a4]).distance().$**

`$([1,2,3,4]).distance([4,3,2,1], 0.25).$  
   // --> 4.47213595499958`
   
- **squared distance:**  
*faster than 'distance', use if you only need it for comparision*

**$([a1, a2, a3, a4]).squaredDistance().$**

`$([1,2,3,4]).squaredDistance([4,3,2,1], 0.25).$  
   // --> 20  `
   
**Unit vector:**
---

- **unit:**

**$([a1, a2, a3, a4])>unit().$**
   
`$([1,2,3,4]).unit().$  
   // --> [0.18257418583505536, 0.3651483716701107, 0.5477225575051661, 0.7302967433402214]`

**Normals (2d vectors only):**
---

- **leftNormal:**  
*a.k.a. rotate 90 deg left*


**$([a1, a2]).leftNormal().$**

`$([1,2]).leftNormal().$  
   // --> [-0.8944271909999159, 0.4472135954999579]`
   
- **rightNormal**  
*a.k.a. rotate 90 deg left*
   
**$([a1, a2]).rightNormal().$**

`$([1,2]).rightNormal().$  
   // --> [0.8944271909999159, -0.4472135954999579]`

   
Yet to write up:  
- angle
- angle between
- rotation
- scale
- cross product
- direction to
- projected length
- transpose
- inverse
- rotate to plane
- scalar projection
- is left of line segment
