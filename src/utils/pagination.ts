interface PaginationQuery {
    page: number
    offset: number
}

export const paginationQuery = (rowsPerPage: number | null = 10, pageNumber: number): PaginationQuery => {

    const page = +pageNumber ? +pageNumber : 1

    if (!rowsPerPage) {
        return {
            page,
            offset: 10
        }
    }

    const offset = (page - 1) * Number(rowsPerPage)

    return {
        page,
        offset
    }
}