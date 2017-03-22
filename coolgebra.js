const END_TAG = '$';

const Stack = require('./stack'),
  {sin, cos} = Math,
  vectorInstance = new Vector(),
  values = new Stack();
var size = 0;

function Vector(){};

var $ = function(v){
  values.push(v);
  size = v.length;
  return vectorInstance;
};

Object.defineProperty(Vector.prototype, END_TAG, {
  get: function(){
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
    16: {
      4: function(){
        return [
          u[0]*v[0], u[1]*v[1], u[2]*v[2], u[3]*v[3],
          u[4]*v[0], u[5]*v[1], u[6]*v[2], u[7]*v[3],
          u[8]*v[0], u[9]*v[1], u[10]*v[2],u[11]*v[3],
          u[12]*v[0],u[13]*v[1],u[14]*v[2],u[15]*v[3]
        ];
      },
      16: function(){
        return [
          u[0]*v[0] + u[1]*v[4] + u[2]*v[8] + u[3]*v[12],
          u[0]*v[1] + u[1]*v[5] + u[2]*v[9] + u[3]*v[13],
          u[0]*v[2] + u[1]*v[6] + u[2]*v[10] + u[3]*v[14],
          u[0]*v[3] + u[1]*v[7] + u[2]*v[11] + u[3]*v[15],

          u[4]*v[0] + u[5]*v[4] + u[6]*v[8] + u[7]*v[12],
          u[4]*v[1] + u[5]*v[5] + u[6]*v[9] + u[7]*v[13],
          u[4]*v[2] + u[5]*v[6] + u[6]*v[10] + u[7]*v[14],
          u[4]*v[3] + u[5]*v[7] + u[6]*v[11] + u[7]*v[15],

          u[8]*v[0] + u[9]*v[4] + u[10]*v[8] + u[11]*v[12],
          u[8]*v[1] + u[9]*v[5] + u[10]*v[9] + u[11]*v[13],
          u[8]*v[2] + u[9]*v[6] + u[10]*v[10] + u[11]*v[14],
          u[8]*v[3] + u[9]*v[7] + u[10]*v[11] + u[11]*v[15],

          u[12]*v[0] + u[13]*v[4] + u[14]*v[8] + u[15]*v[12],
          u[12]*v[1] + u[13]*v[5] + u[14]*v[9] + u[15]*v[13],
          u[12]*v[2] + u[13]*v[6] + u[14]*v[10] + u[15]*v[14],
          u[12]*v[3] + u[13]*v[7] + u[14]*v[11] + u[15]*v[15]
        ];
      }
    }[v.length]
  };
  values.push(functionVersion[size]());
  return this;
}

Vector.prototype.times = function(...x){
  if (x.length === 1){
    return this.timesScalar(x)
  } else {
    return this.timesVector(...x);
  }
};

Vector.prototype.divideByScalar = function(s){
  var v = values.pop();
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
  if (x.length === 1){
    return this.divideByScalar(x)
  } else {
    return this.divideByVector(x);
  }
};

Vector.prototype.dot = function(v){
  var u = values.pop();
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

Vector.prototype.squaredDistance = function(v){
  values.push(this.minusVector(v).squaredLength()[END_TAG]);
  return this;
}

Vector.prototype.distance = function(v){
  values.push(Math.sqrt(this.squaredDistance(v)[END_TAG]));
  return this;
}

Vector.prototype.unit = function(){
  values.push(
    this.divideByScalar($(values.peek()).length()[END_TAG])[END_TAG]
  );
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
  return this.turnLeft().unit();
}

Vector.prototype.rightNormal = function(){
  return this.turnRight().unit();
}

Vector.prototype.rotate2d = function(angle){
  var v = values.pop()
  v[0] = v[0] * cos(angle) - v[1] * sin(angle);
  v[1] = v[0] * sin(angle) + v[1] * cos(angle);
  values.push(v);
  return this;
}

Vector.prototype.angle2d = function(){
  var v = values.pop();
  values.push(Math.atan2(v[1], v[0]));
  return this;
}

Vector.prototype.directionTo = function(v){
  var u = values.pop();
  values.push(v);
  values.push(this.minusVector(u).unit()[END_TAG]);
  return this;
}

Vector.prototype.projectedLength = function(v){
  values.push(this.dot(v)[END_TAG]);
  return this;
}

// Todo: Add versions for other size matrices
Vector.prototype.transpose = function(){
  var v = values.pop();
  values.push([
    v[0], v[4], v[8], v[12],
    v[1], v[5], v[9], v[13],
    v[2], v[6], v[10], v[14],
    v[3], v[7], v[11], v[15]
  ]);
  return this;
}

Vector.prototype.scale = function(x,y,z){
  values.push(this.times([
    x, 0, 0, 0,
    0, y, 0, 0,
    0, 0, z, 0,
    0, 0, 0, 1
  ])[END_TAG]);
  return this;
};

Vector.prototype.rotate = function(x,y,z){
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

  values.push(this.times(xRotation).times(yRotation).times(zRotation)[END_TAG]);
  return this;
}

Vector.prototype.inverse = function(){
  var r = Vector.IDENTITY_MATRIX,
    m = values.pop();

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