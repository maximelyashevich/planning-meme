import React, {Component} from 'react';
import './style/style.css'
import BoardPagination from "./BoardPagination";
import {Table, TableRow, TableThStyle, TableThStyleHidden} from "../style/MainWindowStyle";

class BoardTable extends Component {

    render() {
        return (
            <TableRow>
                <Table>
                    <thead>
                    <tr>
                        <TableThStyle>Title</TableThStyle>
                        <TableThStyleHidden>Time</TableThStyleHidden>
                        <TableThStyleHidden>Stories</TableThStyleHidden>
                        <TableThStyle/>
                        <TableThStyle/>
                    </tr>
                    </thead>
                    <tbody className="text-left">
                    {this.props.boardList}
                    </tbody>
                </Table>
                <BoardPagination pageSize={this.props.pageSize}
                                 boardCount={this.props.boardCount}
                                 pageNumberHandler={this.props.onInputPageNumberChange}/>
            </TableRow>
        );
    }
}

export default BoardTable;
