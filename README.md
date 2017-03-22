# coolgebra-js

A performant and expressive library for complex vector and matrix calculations. I wrote Coolgebra because I wanted to be able to chain vector/matrix operations, but without incurring the overhead of creating a whole new object with every operation.

The syntax is designed to feel as if you were using a library like Sylvester, but it is leaner behind the scenes. All results are stored in a single module-scoped stack, and the module exposes a singleton containing all the methods, which all return itself.

Coolgebra is a work in progress. It is written in ES6 and may need to be transpiled for browser environments. Require it in your build and assign it to the $ variable (see below about using a different variable).

Further optimizations could include:
-object pooling the arrays
-adding syntax to use only specialized methods for the given vector/matrix size

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
