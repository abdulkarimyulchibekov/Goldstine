import create from 'zustand';
import { persist } from 'zustand/middleware';
let store = (set) => ({
	people: [],
	addPerson: (person) =>
		set((state) => ({ people: [...state.people, person] })),
	deletePerson: (arr) => set(() => ({ people: arr })),
	editPerson: (id, person) =>
		set((state) => ({
			people: state.people.map((e) => {
				if (e.id == id) {
					return { id: id, ...person };
				}
				return e;
			}),
		})),
});

store = persist(store, { name: 'people' });
const useStore = create(store);

export default useStore;
