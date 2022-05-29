import Api from "./api";

export function get(query) {
	return Api.get("/user", { ...query });
}
export function show(id) {
    return Api.get('/user/' + id);
}
export function create(user) {
    return Api.post('/user',user)
}
export function destroy (id){
    return Api.delete(`/user/${id}`)
}
export function update(user) {
    return Api.patch(`/user/${user.id}`,user)
}
export function hasRight(user, action, /*object*/) {
    if (!user.Profile.Autorisations.find(a => a.nom == action)) return false;
    //if (action.split('-')[1] == 'fonction' && object.id == user.Profile.id) return false;
    return true;
}
export default {
    get,
    create,
    show,
    destroy,
    update,
    hasRight
};
