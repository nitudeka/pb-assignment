export const createUUID = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16),
  );
};

export const getUUID = () => {
  let uuid = localStorage.getItem("uuid");
  if (!uuid) {
    uuid = createUUID();
    localStorage.setItem("uuid", uuid);
  }

  return uuid;
};
