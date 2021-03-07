export const changeSelect = value => {
    return {type: "roles", payload: [{'rolename': value}]}
}