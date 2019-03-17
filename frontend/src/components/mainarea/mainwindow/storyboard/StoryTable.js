import React, {Component} from 'react';
import StoryPagination from "./StoryPagination";
import {Table, TableRow, TableThStyle, TableThStyleHidden, TableThStyleModal} from "../style/MainWindowStyle";

const tableStyle = {
    background: '#2a64960d'
};

class StoryTable extends Component {

    render() {
        return (
            <TableRow>
                <Table>
                    <thead>
                    <tr style={tableStyle}>
                        <TableThStyle>Title</TableThStyle>
                        <TableThStyleHidden>Start time</TableThStyleHidden>
                        <TableThStyleHidden>Finish time</TableThStyleHidden>
                        <TableThStyleHidden>Votes</TableThStyleHidden>
                        <TableThStyleHidden>Estimation</TableThStyleHidden>
                        <TableThStyleModal/>
                        <TableThStyle/>
                    </tr>
                    </thead>
                    <tbody className="text-left">
                    {this.props.storyList}
                    </tbody>
                </Table>
                <StoryPagination pageSize={this.props.pageSize}
                                 storyCount={this.props.storyCount}
                                 pageNumberHandler={this.props.onInputPageNumberChange}/>
            </TableRow>
        );
    }
}

export default StoryTable;
