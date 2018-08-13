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
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';

class RemoteDataTable extends Component {
    static propTypes = {
        columns: PropTypes.array.isRequired,
        data: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired,
        page: PropTypes.number.isRequired,
        totalSize: PropTypes.number.isRequired,
        sizePerPage: PropTypes.number.isRequired,
        onTableChange: PropTypes.func.isRequired,
        onSelectedRow: PropTypes.func.isRequired
    };

    static defaultProps = {
        sizePerPage: 10,
        page: 1
    };

    constructor(props) {
        super(props);
        this.state = {selected: []};
    }

    handleOnSelect(row, isSelect) {
        let selected = [...this.state.selected, row._id];
        if (!isSelect) {
            selected = this.state.selected.filter(x => x !== row._id);
        }
        this.setState({
            selected: selected
        }, this.props.onSelectedRow(selected));
    }

    render() {
        const {SearchBar} = Search;
        const {data, loading, columns, page, sizePerPage, totalSize, onTableChange} = this.props;
        const selectRow = {
            mode: 'checkbox',
            selected: this.state.selected,
            onSelect: this.handleOnSelect.bind(this),
            clickToSelect: true,
            hideSelectColumn: true,
            bgColor: '#e8e3ff'
        };
        const defaultSorted = [{
            dataField: 'createdAt',
            order: 'desc'
        }];

        return (
            <ToolkitProvider
                keyField="_id"
                data={ data }
                columns={ columns }
                search
            >
                {
                    toolkitprops => [
                        <SearchBar key='search' { ...toolkitprops.searchProps } />,
                        <BootstrapTable { ...toolkitprops.baseProps }
                            key='search-table'
                            loading={ loading }
                            defaultSorted={ defaultSorted }
                            remote
                            filter={ filterFactory() }
                            pagination={ paginationFactory({page, sizePerPage, totalSize}) }
                            onTableChange={ onTableChange }
                            selectRow={ selectRow }
                            bordered={ false }
                            striped
                            hover
                        />
                    ]
                }
            </ToolkitProvider>
        );
    }
}

export default RemoteDataTable;
