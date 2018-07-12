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
        page: PropTypes.number.isRequired,
        totalSize: PropTypes.number.isRequired,
        sizePerPage: PropTypes.number.isRequired,
        onTableChange: PropTypes.func.isRequired
    };

    render() {
        const {data, columns, defaultSorted, page, sizePerPage, totalSize, onTableChange} = this.props;
        return (
            <BootstrapTable keyField='_id'
                            data={ data }
                            columns={ columns }
                            defaultSorted={ defaultSorted }
                            remote={{ pagination: true }}
                            filter={ filterFactory() }
                            pagination={ paginationFactory({page, sizePerPage, totalSize }) }
                            onTableChange={ onTableChange }
                            bordered={ false }
                            striped
                            hover
            />
        );
    }
}

export default RemoteDataTable;
