
export const MUI_CHANGE_LANGUAGE = 'MUI_CHANGE_LANGUAGE';

export function changeLanguage(langFunction) {
    return dispatch => {
        dispatch({
            type: MUI_CHANGE_LANGUAGE,
            payload: {
                language: langFunction
            }
        });
    };
}
