/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date     12/07/2018
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';


class RemoteDataTable extends Component {
    static propTypes = {
        columns: PropTypes.array.isRequired,
        defaultSorted: PropTypes.array.isRequired,
        data: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired,
        page: PropTypes.number.isRequired,
        totalSize: PropTypes.number.isRequired,
        sizePerPage: PropTypes.number.isRequired,
        onTableChange: PropTypes.func.isRequired
    };

    static defaultProps = {
        sizePerPage: 10,
        page: 1
    };

    render() {
        const {data, loading, columns, defaultSorted, page, sizePerPage, totalSize, onTableChange} = this.props;
        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            hideSelectColumn: true,
            bgColor: '#e8e3ff'
        };
        return (
            <BootstrapTable keyField='_id'
                            data={ data }
                            loading={ loading }
                            columns={ columns }
                            defaultSorted={ defaultSorted }
                            remote={{ pagination: true }}
                            filter={ filterFactory() }
                            pagination={ paginationFactory({page, sizePerPage, totalSize }) }
                            onTableChange={ onTableChange }
                            selectRow={ selectRow }
                            bordered={ false }
                            striped
                            hover
            />
        );
    }
}

export default RemoteDataTable;
