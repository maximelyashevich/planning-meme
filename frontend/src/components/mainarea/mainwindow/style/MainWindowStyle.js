import styled from "styled-components";

const AreaContainer = styled.div.attrs({
    className: "container "
})``;

const AreaColumns = styled.div.attrs({
    className: "col-md-12 text-left no-top-padding"
})``;

const BoardAreaColumns = styled.div.attrs({
    className: "col-md-12 text-left no-top-padding"
})``;

const AreaTitle = styled.div` color: #808284; font-size: 24px; margin-top: 3em; margin-bottom: 15px;`;

const AreaRow = styled.div.attrs({
    className: "row"
})``;

const TableThStyle = styled.th`
    font-weight: 400;
    border-bottom: 2px solid #ddd;
`;

const TableThStyleHidden = styled(TableThStyle).attrs({
    className: "hidden-xs"
})``;

const TableThStyleModal = styled(TableThStyle).attrs({
    'data-toggle': "modal",
    'data-target': "#createStory"
})``;

const TableTrClickableTitle = styled.tr.attrs({
    className: "clickable ng-scope"
})`cursor: pointer;
   background: ${props => props.isFinished ? '#428bca2e' : 'transparent'};`;

const CreateBoardButtonAttribute = styled.a.attrs({
    className: "btn btn-primary pull-right fa btn btn-default",
    'data-target': "#createBoard",
    'data-toggle': "modal"
})`padding: 6px 12px; margin-bottom: 0; font-size: 14px; font-weight: normal; line-height: 1.428571429;
    text-align: center; white-space: nowrap; vertical-align: middle; cursor: pointer; background-image: none;
    border: 1px solid transparent; border-radius: 4px;`;

const CreateStoryButtonAttribute = styled.a.attrs({
        className: "btn btn-primary pull-right fa btn btn-default",
        'data-target': "#createStory",
        'data-toggle': "modal"
    })`padding: 6px 12px; margin-bottom: 0; font-size: 14px; font-weight: normal; line-height: 1.428571429;
        text-align: center; white-space: nowrap; vertical-align: middle; cursor: pointer; background-image: none;
        border: 1px solid transparent; border-radius: 4px;`;

const CreateButton = styled.div.attrs({
    className: "no-left-padding"
})``;

const TableNamedTd = styled.td.attrs({
    className: "name-td"
})``;

const TableHiddenXs = styled.td.attrs({
    className: "hidden-xs"
})``;

const TableEditIcon = styled.td.attrs({
    className: "edit-icon"
})``;

const DeleteIAttribute = styled.i.attrs({
    className: "delete-icon-trash fa fa-trash"
})``;

const TableRow = styled.div.attrs({
    className: "row grayed-box-app"
})` padding-bottom: 50px`;

const Table = styled.table.attrs({
    className: "table table-hover table-boards"
})`width: 100%; max-width: 100%; margin-top: 50px; font-weight: 400; font-family: "Open Sans",sans-serif;`;

const Divider = styled.hr`
    display: block;
    height: 2px;
    border: 0;
    border-top: 2px solid #808284;
    margin: 1em 0;
    padding: 0;
`;

export {
    AreaContainer,
    AreaColumns,
    BoardAreaColumns,
    AreaTitle,
    AreaRow,
    TableTrClickableTitle,
    TableNamedTd,
    TableHiddenXs,
    TableEditIcon,
    DeleteIAttribute,
    Table,
    TableRow,
    TableThStyle,
    TableThStyleHidden,
    TableThStyleModal,
    CreateBoardButtonAttribute,
    CreateStoryButtonAttribute,
    CreateButton,
    Divider
}