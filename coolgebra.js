const END_TAG = '$';

const Stack = require('./stack'),
  {sin, cos} = Math,
  vectorInstance = new Vector(),
  values = new Stack(),
  sizeStack = new Stack();
sizeStack.push(0);
var size = 0;

function Vector(){};

var $ = function(v){
  values.push(v);
  // sizeStack.push(v.length);
  // size = sizeStack.peek();
  return vectorInstance;
};

Object.defineProperty(Vector.prototype, END_TAG, {
  get: function(){
    // sizeStack.pop();
    // size = sizeStack.peek();
    return values.pop();
  }
});

// Functions

Vector.prototype.plus = function(x){
  if (Array.isArray(x)){
    return this.plusVector(x);
  } else {
    return this.plusScalar(x);
  }
}

Vector.prototype.plusScalar = function(s){
  var v = values.pop();
  var size = v.length;

  // Selects appropriate version for vector/matrix size--no logic branching, no loops, lazily evaluated, for optimal(?) performance
  var functionVersion = {
    2: function(){
      return [v[0]+s, v[1]+s];
    },
    3: function(){
      return [v[0]+s, v[1]+s, v[2]+s];
    },
    4: function(){
      return [v[0]+s, v[1]+s, v[2]+s, v[3]+s];
    }
  }
  values.push(functionVersion[size]());
  return this;
}

Vector.prototype.plusVector = function(v){
  var u = values.pop();
  var size = u.length;
  var functionVersion = {
    2: function(){
      return [u[0]+v[0], u[1]+v[1]];
    },
    3: function(){
      return [u[0]+v[0], u[1]+v[1], u[2]+v[2]];
    },
    4: function(){
      return [u[0]+v[0], u[1]+v[1], u[2]+v[2], u[3]+v[3]];
    }
  };
  values.push(functionVersion[size]());
  return this;
};

Vector.prototype.minusVector = function(v){
  var u = values.pop();
  var size = u.length;
  var functionVersion = {
    2: function(){
      return [u[0]-v[0], u[1]-v[1]];
    },
    3: function(){
      return [u[0]-v[0], u[1]-v[1], u[2]-v[2]];
    },
    4: function(){
      return [u[0]-v[0], u[1]-v[1], u[2]-v[2], u[3]-v[3]];
    }
  };
  values.push(functionVersion[size]());
  return this;
};

Vector.prototype.timesScalar = function(s){
  var v = values.pop();
  var size = v.length;
  var functionVersion = {
    2: function(){
      return [v[0]*s, v[1]*s];
    },
    3: function(){
      return [v[0]*s, v[1]*s, v[2]*s];
    },
    4: function(){
      return [v[0]*s, v[1]*s, v[2]*s, v[3]*s];
    }
  }
  values.push(functionVersion[size]());
  return this;
}

Vector.prototype.timesVector = function(v){
  var u = values.pop();
  var size = u.length;
  var functionVersion = {
    2: function(){
      return [u[0]*v[0], u[1]*v[1]];
    },
    3: function(){
      return [u[0]*v[0], u[1]*v[1], u[2]*v[2]];
    },
    4: function(){
      return [u[0]*v[0], u[1]*v[1], u[2]*v[2], u[3]*v[3]];
    },

  }[v.length];
  values.push(functionVersion[size]());
  return this;
}

Vector.prototype.timesMatrix = function(m){
  var v = values.pop();
  var size = v.length;
  var functionVersion = {
    3: function(){
      return [
        m[0]*v[0] + m[1]*v[1] + m[2]*v[2],
        m[3]*v[0] + m[4]*v[1] + m[5]*v[2],
        m[6]*v[0] + m[7]*v[1] + m[8]*v[2],
      ];
    },
    4: function(){
      return [
        m[0]*v[0] + m[1]*v[1] + m[2]*v[2] + m[3]*v[3],
        m[4]*v[0] + m[5]*v[1] + m[6]*v[2] + m[7]*v[3],
        m[8]*v[0] + m[9]*v[1] + m[10]*v[2] + m[11]*v[3],
        m[12]*v[0] + m[13]*v[1] + m[14]*v[2] + m[15]*v[3]
      ];
    },
    16: function(){
      return [
        m[0]*v[0] + m[1]*v[4] + m[2]*v[8] + m[3]*v[12],
        m[0]*v[1] + m[1]*v[5] + m[2]*v[9] + m[3]*v[13],
        m[0]*v[2] + m[1]*v[6] + m[2]*v[10] + m[3]*v[14],
        m[0]*v[3] + m[1]*v[7] + m[2]*v[11] + m[3]*v[15],

        m[4]*v[0] + m[5]*v[4] + m[6]*v[8] + m[7]*v[12],
        m[4]*v[1] + m[5]*v[5] + m[6]*v[9] + m[7]*v[13],
        m[4]*v[2] + m[5]*v[6] + m[6]*v[10] + m[7]*v[14],
        m[4]*v[3] + m[5]*v[7] + m[6]*v[11] + m[7]*v[15],

        m[8]*v[0] + m[9]*v[4] + m[10]*v[8] + m[11]*v[12],
        m[8]*v[1] + m[9]*v[5] + m[10]*v[9] + m[11]*v[13],
        m[8]*v[2] + m[9]*v[6] + m[10]*v[10] + m[11]*v[14],
        m[8]*v[3] + m[9]*v[7] + m[10]*v[11] + m[11]*v[15],

        m[12]*v[0] + m[13]*v[4] + m[14]*v[8] + m[15]*v[12],
        m[12]*v[1] + m[13]*v[5] + m[14]*v[9] + m[15]*v[13],
        m[12]*v[2] + m[13]*v[6] + m[14]*v[10] + m[15]*v[14],
        m[12]*v[3] + m[13]*v[7] + m[14]*v[11] + m[15]*v[15]
      ];
    }
  };
  values.push(functionVersion[size]());
  return this;
}


Vector.prototype.times = function(...x){
  if (x.length === 1){
    return this.timesScalar(x)
  } else if (x.length === 16) {
    return this.timesMatrix(...x);
  } else {
    return this.timesVector(...x);
  }
};

Vector.prototype.divideByScalar = function(s){
  var v = values.pop();
  var size = v.length;
  var functionVersion = {
    2: function(){
      return [v[0]/s, v[1]/s];
    },
    3: function(){
      return [v[0]/s, v[1]/s, v[2]/s];
    },
    4: function(){
      return [v[0]/s, v[1]/s, v[2]/s, v[3]/s];
    }
  }
  values.push(functionVersion[size]());
  return this;
}

Vector.prototype.divideByVector = function(v){
  var u = values.pop();
  var size = u.length;
  var functionVersion = {
    2: function(){
      return [u[0]/v[0], u[1]/v[1]];
    },
    3: function(){
      return [u[0]/v[0], u[1]/v[1], u[2]/v[2]];
    },
    4: function(){
      return [u[0]/v[0], u[1]/v[1], u[2]/v[2], u[3]/v[3]];
    }
  };
  values.push(functionVersion[size]());
  return this;
}

Vector.prototype.divideBy = function(x){
  if (Array.isArray(x)){
    return this.divideByVector(x);
  } else {
    return this.divideByScalar(x);
  }
};

Vector.prototype.dot = function(v){
  var u = values.pop();
  var size = u.length;
  var functionVersion = {
    2: function(){
      return u[0]*v[0] + u[1]*v[1];
    },
    3: function(){
      return u[0]*v[0] + u[1]*v[1] + u[2]*v[2];
    },
    4: function(){
      return u[0]*v[0] + u[1]*v[1] + u[2]*v[2] + u[3]*v[3];
    }
  };
  values.push(functionVersion[size]());
  return this;
}

Vector.prototype.mix = function(v, t = 0.5){
  values.push(
    this.timesScalar(1-t).plusVector($(v).timesScalar(t)[END_TAG])[END_TAG]
  );
  return this;
}

Vector.prototype.squaredLength = function() {
  values.push(this.dot(values.peek())[END_TAG]);
  return this;
}

Vector.prototype.length = function(){
  values.push(Math.sqrt(this.squaredLength()[END_TAG]));
  return this;
}

Vector.prototype.distanceTo = function(b){
  var a = values.pop();
  var vec = $(b).minusVector(a).$;
  values.push($(vec).length().$);
  return this;
}

Vector.prototype.squaredDistanceTo = function(b){
  var a = values.pop();
  var vec = $(b).minusVector(a).$;
  values.push($(vec).squaredLength().$);
  return this;
}

Vector.prototype.nearest = function(a, b){
  var v = values.pop();
  var distA = $(v).squaredDistanceTo(a).$;
  var distB = $(v).squaredDistanceTo(b).$;
  values.push( distA < distB ? a : b);
  return this;
}

Vector.prototype.isLeftOf = function(r){
  var v = values.pop();
  values.push((v[1]-r[1])*(r[2]-r[0]) > (v[0]-r[0])*(r[3]-r[2]));
  return this;
}

Vector.prototype.unit = function(){
  var value = values.peek();
  if (value[0] === 0 && value[1] === 0 && value[2] === 0) {
    values.pop();
    values.push([0,0,0]);
  } else {
    values.push(
      this.divideByScalar($(values.peek()).length()[END_TAG])[END_TAG]
    );
  }
  return this;
}

Vector.prototype.turnLeft = function(){
  var v = values.pop();
  values.push([-v[1], v[0]]);
  return this;
}

Vector.prototype.turnRight = function(){
  var v = values.pop();
  values.push([v[1], -v[0]]);
  return this;
}

Vector.prototype.leftNormal = function(){
  var v = values.pop();
  values.push($(v).unit().turnLeft()[END_TAG]);
  return this;
}

Vector.prototype.rightNormal = function(){
  var v = values.pop();
  values.push($(v).unit().turnRight()[END_TAG]);
  return this;
}

Vector.prototype.rotate2d = function(angle){
  var v = values.pop();
  var size = v.length;
  v[0] = v[0] * cos(angle) - v[1] * sin(angle);
  v[1] = v[0] * sin(angle) + v[1] * cos(angle);
  values.push(v);
  return this;
}

Vector.prototype.angle2d = function(){
  var v = values.pop();
  var size = v.length;
  values.push(Math.atan2(v[1], v[0]));
  return this;
}

Vector.prototype.directionTo = function(v){
  var u = values.pop();
  var size = u.length;
  values.push(this.minusVector(u).unit()[END_TAG]);
  return this;
}

Vector.prototype.projectedLength = function(v){
  values.push(Math.sqrt(Math.abs(this.dot(v)[END_TAG])));
  return this;
}

Vector.prototype.scalarProjection = function(b){
  var a = values.pop();
  var bLength = $(b).length().$;
  values.push(bLength === 0 ? 0 : $(a).dot(b).$ / $(b).length().$);
  return this;
}

// Todo: Add versions for other size matrices
Vector.prototype.transpose = function(){
  var v = values.pop();
  var size = v.length;
  values.push([
    v[0], v[4], v[8], v[12],
    v[1], v[5], v[9], v[13],
    v[2], v[6], v[10], v[14],
    v[3], v[7], v[11], v[15]
  ]);
  return this;
}

Vector.prototype.rotate = function([x, y, z]){
  var v = values.pop();
  var size = v.length;
  if (size === 2){
    values.push(this.rotate2d(x)[END_TAG]);
    return this;
  }
  var xRotation = [
      1, 0, 0, 0,
      0,cos(x), -sin(x), 0,
      0, sin(x), cos(x), 0,
      0, 0, 0, 1
    ],
      yRotation = [
      cos(y), 0, sin(y), 0,
      0, 1, 0, 0,
      -sin(y), 0, cos(y), 0,
      0, 0, 0, 1
    ],
    zRotation = [
      cos(z), -sin(z), 0, 0,
      sin(z), cos(z), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ];
  values.push($(v).timesMatrix(xRotation).timesMatrix(yRotation).timesMatrix(zRotation)[END_TAG]);
  return this;
}

Vector.prototype.cross = function(b){
  var a = values.pop();
  var size = a.length;
  values.push([
    a[1]*b[2] - a[2]*b[1],
    a[2]*b[0] - a[0]*b[2],
    a[0]*b[1] - a[1]*b[0]
  ]);
  return this;
}

Vector.prototype.coordPairToVector = function(){
  var coords = values.pop();
  values.push($([coords[2], coords[3]]).minusVector([coords[0], coords[1]]).$);
  return this;
}

Vector.prototype.angleTo = function(b){
  var a = values.pop();
  values.push(Math.acos($(a).dot(b).$));
  return this;
}

Vector.prototype.rotateToPlane = function(planeNormal, myAxis = [0,1,0]){
  var v = values.pop();
  var rotationMatrix = [];
  if (planeNormal[0] != 0 || planeNormal[1] != 0 || planeNormal[2] != 0) {
    var angle = Math.acos($(myAxis).dot(planeNormal).$),
      axis = $(myAxis).cross(planeNormal).unit().$,
      c = cos(angle),
      t = 1 - c,
      s = sin(angle),
      [x, y, z] = axis,
      tX = t*x,
      tY = t*y,
      tZ = t*z,
      tXY = tX * y,
      tYX = tXY,
      tXX = tX * x,
      tYZ = tY * z,
      tZY = tYZ,
      tYY = tY * y,
      tXZ = tX * z,
      tZX = tXZ,
      tZZ = tZ * z,
      xS = x * s,
      yS = y * s,
      zS = z * s,
    rotationMatrix = [
      tXX + c,   tYX - zS,  tZX + yS,
      tXY + zS,  tYY + c,   tZY - xS,
      tXZ + yS,  tYZ + xS,  tZZ + c
    ];
  } else {
    rotationMatrix = [1,0,0, 0,1,0, 0,0,1];
  }
  values.push($(v).timesMatrix(rotationMatrix).$);
  return this;
}

Vector.prototype.inverse = function(){
  var r = Vector.IDENTITY_MATRIX,
    m = values.pop();
    var size = m.length;

  r[0] = m[5]*m[10]*m[15] - m[5]*m[14]*m[11] - m[6]*m[9]*m[15] + m[6]*m[13]*m[11] + m[7]*m[9]*m[14] - m[7]*m[13]*m[10];
  r[1] = -m[1]*m[10]*m[15] + m[1]*m[14]*m[11] + m[2]*m[9]*m[15] - m[2]*m[13]*m[11] - m[3]*m[9]*m[14] + m[3]*m[13]*m[10];
  r[2] = m[1]*m[6]*m[15] - m[1]*m[14]*m[7] - m[2]*m[5]*m[15] + m[2]*m[13]*m[7] + m[3]*m[5]*m[14] - m[3]*m[13]*m[6];
  r[3] = -m[1]*m[6]*m[11] + m[1]*m[10]*m[7] + m[2]*m[5]*m[11] - m[2]*m[9]*m[7] - m[3]*m[5]*m[10] + m[3]*m[9]*m[6];

  r[4] = -m[4]*m[10]*m[15] + m[4]*m[14]*m[11] + m[6]*m[8]*m[15] - m[6]*m[12]*m[11] - m[7]*m[8]*m[14] + m[7]*m[12]*m[10];
  r[5] = m[0]*m[10]*m[15] - m[0]*m[14]*m[11] - m[2]*m[8]*m[15] + m[2]*m[12]*m[11] + m[3]*m[8]*m[14] - m[3]*m[12]*m[10];
  r[6] = -m[0]*m[6]*m[15] + m[0]*m[14]*m[7] + m[2]*m[4]*m[15] - m[2]*m[12]*m[7] - m[3]*m[4]*m[14] + m[3]*m[12]*m[6];
  r[7] = m[0]*m[6]*m[11] - m[0]*m[10]*m[7] - m[2]*m[4]*m[11] + m[2]*m[8]*m[7] + m[3]*m[4]*m[10] - m[3]*m[8]*m[6];

  r[8] = m[4]*m[9]*m[15] - m[4]*m[13]*m[11] - m[5]*m[8]*m[15] + m[5]*m[12]*m[11] + m[7]*m[8]*m[13] - m[7]*m[12]*m[9];
  r[9] = -m[0]*m[9]*m[15] + m[0]*m[13]*m[11] + m[1]*m[8]*m[15] - m[1]*m[12]*m[11] - m[3]*m[8]*m[13] + m[3]*m[12]*m[9];
  r[10] = m[0]*m[5]*m[15] - m[0]*m[13]*m[7] - m[1]*m[4]*m[15] + m[1]*m[12]*m[7] + m[3]*m[4]*m[13] - m[3]*m[12]*m[5];
  r[11] = -m[0]*m[5]*m[11] + m[0]*m[9]*m[7] + m[1]*m[4]*m[11] - m[1]*m[8]*m[7] - m[3]*m[4]*m[9] + m[3]*m[8]*m[5];

  r[12] = -m[4]*m[9]*m[14] + m[4]*m[13]*m[10] + m[5]*m[8]*m[14] - m[5]*m[12]*m[10] - m[6]*m[8]*m[13] + m[6]*m[12]*m[9];
  r[13] = m[0]*m[9]*m[14] - m[0]*m[13]*m[10] - m[1]*m[8]*m[14] + m[1]*m[12]*m[10] + m[2]*m[8]*m[13] - m[2]*m[12]*m[9];
  r[14] = -m[0]*m[5]*m[14] + m[0]*m[13]*m[6] + m[1]*m[4]*m[14] - m[1]*m[12]*m[6] - m[2]*m[4]*m[13] + m[2]*m[12]*m[5];
  r[15] = m[0]*m[5]*m[10] - m[0]*m[9]*m[6] - m[1]*m[4]*m[10] + m[1]*m[8]*m[6] + m[2]*m[4]*m[9] - m[2]*m[8]*m[5];

  // In case of divide by zero error, if det is 0 just leave unchanged
  var det = (m[0]*r[0] + m[1]*r[4] + m[2]*r[8] + m[3]*r[12]) || 1;
  for (var i = 0; i < 16; i++) r[i] /= det;
  values.push(r);
  return this;
}

module.exports = $;