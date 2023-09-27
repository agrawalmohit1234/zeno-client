const END_POINT = "https://zeno-1jmd.onrender.com";

const create = async (patient) => {
  try {
    let response = await fetch(`${END_POINT}/api/users/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patient),
    });
    return await response.json();
  } catch (err) {
    return err;
  }
};

const list = async () => {
  try {
    let response = await fetch(`${END_POINT}/api/users/`, {
      method: "GET",
    });
    return await response.json();
  } catch (err) {
    return err;
  }
};

const read = async (params) => {
  try {
    let response = await fetch(`${END_POINT}/api/users/` + params.userId, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    return err;
  }
};

const update = async (params, patient) => {
  try {
    let response = await fetch(`${END_POINT}/api/users/` + params.userId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patient),
    });
    return await response.json();
  } catch (err) {
    return err;
  }
};

const remove = async (params) => {
  try {
    let response = await fetch(`${END_POINT}/api/users/` + params.userId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    return err;
  }
};

export { create, list, read, update, remove };
