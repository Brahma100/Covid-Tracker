import React from 'react'
import { useTable } from 'react-table'
import './Table.css'

function Table({ userInfo }) {
    const data = React.useMemo(
        () => [
            {
                col1: userInfo.name.first + " " + userInfo.name.last,
                col2: userInfo.picture.large,
                col3: userInfo.picture.medium,
                col4: userInfo.picture.thumbnail,
                col5: userInfo.location.coordinates.latitude + ", " + userInfo.location.coordinates.longitude,
            }
        ],
        []
    )

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'col1',
            },
            {
                Header: 'Large Image',
                accessor: 'col2',
            },
            {
                Header: 'Medium Image',
                accessor: 'col3',
            },
            {
                Header: 'Thumbnail Image',
                accessor: 'col4',
            },
            {
                Header: 'Coordinates(Lat,Long)',
                accessor: 'col5',
            },
        ],
        []
    )
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    return (
        <table className='table' {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.column.Header.includes('Image') ? <img src={cell.value} /> : cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
export default Table;
