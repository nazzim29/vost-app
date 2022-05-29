import MatiereService from "@/services/MatiereService";
const defaultState = () => ({
	matieres: [],
});
const usersModule = {
	state: defaultState(),
	mutations: {
        getMatieres(state, matieres) {
            console.log(matieres);
			state.matieres = matieres;
		},
	},
	actions: {
        getMatieres(context, query) {
            console.log(query);
			return MatiereService.get(query)
                .then((res) => {
                    console.log(res)
					return context.commit("getMatieres", res.data);
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
        },
        //update matiere
        updateMatiere(context, matiere) {
            return MatiereService.update(matiere)
                .then(() => {
                    return context.dispatch("getMatieres", {});
                })
                .catch((err) => {
                    return context.dispatch("add-error", err.response.data.message);
                });
        },
        //delete matiere
        deleteMatiere(context, id) {
            return MatiereService.destroy(id)
                .then(() => {
                    return context.dispatch("getMatieres", {});
                })
                .catch((err) => {
                    return context.dispatch("add-error", err.response.data.message);
                });
        },
        addMatiere(context, matiere) {
            return MatiereService.create(matiere)
                .then(() => {
                    return context.dispatch("getMatieres", {});
                })
                .catch((err) => {
                    return context.dispatch("add-error", err.response.data.message);
                });
        },
        arrivageMatieres(context, matieres) {
            return MatiereService.arrivage(matieres)
                .then(() => {
                    return context.dispatch("getMatieres", {});
                })
                .catch((err) => {
                    return context.dispatch("add-error", err.response.data.message);
                });
            
        }
	},
	getters: {
		getMatieres: (state) => state.matieres,
	},
};

export default usersModule;
