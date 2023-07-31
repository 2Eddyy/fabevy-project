export const opportunitiesView = (opportunities) => {
    return {
        type: "VIEW_OPPORTUNITIES",
        payload: opportunities
    }
}

export const candidatesView = (candidates) => {
    return {
        type: "VIEW_OPPORTUNITIES",
        payload: candidates
    }
}