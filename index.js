const crypto = require("crypto");

const decifraCifrado = (cifrado, peso) => {
  const alfabetoValor = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26,
  };

  const objectKeys = Object.keys(alfabetoValor);

  let retornoDecifrado = "";

  const cifradoArray = Array.from(cifrado);

  cifradoArray.forEach(c => {
    let str = c;
    if(/[a-zA-Z]/.test(c)) {
      const index = alfabetoValor[c] - peso;
       str = objectKeys[index - 1];
    }
    retornoDecifrado = retornoDecifrado.concat(str);
  });

  return retornoDecifrado;
};
const xpto = boga => {
  const shasum = crypto.createHash("sha1");
  shasum.update(boga);
  return shasum.digest("hex");
};

module.exports = { decifraCifrado, xpto };
