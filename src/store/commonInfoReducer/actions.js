import { hideLoader, showLoader, showAlert } from "../static/actions";
import { BASE_URL } from "../static/static";
import { getSpecialitie } from "../../api/common";

import {
    GET_ALL_GROUPS,
    GET_DISCIPLINES,
    GET_GROUPS,
    GET_LESSON_TIME,
    GET_LESSON_TYPE,
    GET_SPECIALTIES,
    GET_TEACHERS,
    GET_LOCATIONS,
} from "../static/types";
import {
    _transformDiscipline,
    _transformSpeciality,
    _transformPeriodClass,
    _transformTypeOfClass,
    _transformGroups,
    _tranfromTeachers,
    _transformLocations,
} from "./transformResults";

// Получение специальностей
export function getSpecialities() {
    return async (dispatch) => {
        await getSpecialitie()
            .then((data) => {
                const result = data.map(_transformSpeciality);
                dispatch({ type: GET_SPECIALTIES, payload: result });
            })
            .catch((error) => {
                console.log(error);
                dispatch(showAlert("Что-то пошло не так", "warning"));
            });
    };
}

// Получение времени занятий
export function getLessonTime() {
    return async (dispatch) => {
        try {
            const response = await fetch(`${BASE_URL}/common-info/classes`);

            const json = await response.json();
            const result = await json.map(_transformPeriodClass);

            dispatch({ type: GET_LESSON_TIME, payload: result });
        } catch (error) {
            console.log(error);
        }
    };
}

// Получение дисциплин
export function getDisciplines() {
    return async (dispatch) => {
        try {
            const response = await fetch(`${BASE_URL}/common-info/disciplines`);

            const json = await response.json();
            const result = json.map(_transformDiscipline);

            dispatch({ type: GET_DISCIPLINES, payload: result });
        } catch (error) {
            console.log(error);
        }
    };
}

// Получение типов занятий
export function getLessonType() {
    return async (dispatch) => {
        try {
            const response = await fetch(
                `${BASE_URL}/common-info/types-of-classes`
            );

            const json = await response.json();
            const result = json.map(_transformTypeOfClass);

            dispatch({ type: GET_LESSON_TYPE, payload: result });
        } catch (error) {
            console.log(error);
        }
    };
}

// Получение групп по специальности и курсу
export function getGroups(id, courseNum) {
    return async (dispatch) => {
        try {
            const response = await fetch(
                `${BASE_URL}/common-info/groups/search?q=сourse==${courseNum};specialty.id==${id}`
            );

            const json = await response.json();
            const result = json.map(_transformGroups);

            dispatch({ type: GET_GROUPS, payload: result });
        } catch (error) {
            console.log(error);
        }
    };
}

// Получение всех групп
export function getAllGroups() {
    return async (dispatch) => {
        try {
            const response = await fetch(`${BASE_URL}/common-info/groups`);

            const json = await response.json();
            const result = json.map(_transformGroups);

            dispatch({ type: GET_ALL_GROUPS, payload: result });
        } catch (error) {
            console.log(error);
        }
    };
}

// Получение преподавателей
export function getTeachers() {
    return async (dispatch) => {
        try {
            const response = await fetch(`${BASE_URL}/common-info/employees`);

            const json = await response.json();
            const result = json.map(_tranfromTeachers);

            dispatch({ type: GET_TEACHERS, payload: result });
        } catch (error) {
            console.log(error);
        }
    };
}

// Получение аудиторий
export function getLocations(frame) {
    return async (dispatch) => {
        try {
            const response = await fetch(
                `${BASE_URL}/common-info/classrooms/search?q=frame==${frame}`
            );

            const json = await response.json();
            const result = json.map(_transformLocations);

            dispatch({ type: GET_LOCATIONS, payload: result });
        } catch (error) {
            console.log(error);
        }
    };
}

export function getAllLocations() {
    return async (dispatch) => {
        try {
            const response = await fetch(`${BASE_URL}/common-info/classrooms`);

            const json = await response.json();
            const result = json.map(_transformLocations);

            dispatch({ type: GET_LOCATIONS, payload: result });
        } catch (error) {
            console.log(error);
        }
    };
}

// Фкункция для "активации" почти всех экшенов из этого файла
export function getCommonData() {
    return async (dispatch) => {
        try {
            dispatch(showLoader());
            dispatch(getSpecialities());
            dispatch(getLessonTime());
            dispatch(getDisciplines());
            dispatch(getLessonType());
            dispatch(getTeachers());
            dispatch(hideLoader());
        } catch (error) {
            dispatch(showAlert("Что-то пошло не так", "warning"));
            dispatch(hideLoader());
        }
    };
}
