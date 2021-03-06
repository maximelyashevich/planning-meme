package com.epam.meme.resource;

import com.epam.meme.dtoconverter.BoardConverter;
import com.epam.meme.dto.BoardDto;
import com.epam.meme.entity.Board;
import com.epam.meme.entity.User;
import com.epam.meme.service.BoardService;
import com.epam.meme.service.StoryService;
import com.epam.meme.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import javax.validation.Valid;
import javax.ws.rs.*;
import java.util.List;
import java.util.stream.Collectors;


@Api(value = "/boards", description = "Manage boards")
public class BoardResource {

    @Autowired
    private BoardService boardService;

    @Autowired
    private BoardConverter boardConverter;

    @Autowired
    private StoryService storyService;

    @Autowired
    private UserService userService;

    @Autowired
    private User currentUser;

    @POST
    @ApiOperation(value = "Save board")
    public void create(@Valid BoardDto boardDto) {
        Board board = boardConverter.convertToEntity(boardDto);
        boardService.create(board);
    }

    @POST
    @Path("/{boardId}/members")
    public void addMember(@PathParam("boardId") Long boardId) {
        //TODO check duplicates, change list to set or collection
        boardService.addMember(boardId, currentUser.getId());
    }

    /**
     * Finds specified subset of all boards
     *
     * @param page     number of page (starting from 0)
     * @param pageSize max number of elements on page
     * @return
     */
    @GET
    public List<BoardDto> findAllByAdmin(@QueryParam("page")     int page,
                                         @QueryParam("pageSize") int pageSize) {

        Pageable pageable = PageRequest.of(page, pageSize);
        return userService.findUserBoards(currentUser.getId(), pageable)
                .getContent()
                .stream()
                .map(this.boardConverter::convertToDto)
                .collect(Collectors.toList());
    }

    @GET
    @ApiOperation(value = "Find board by id")
    @Path("/{boardId}")
    public BoardDto findById(@PathParam("boardId") Long boardId) {
        BoardDto boardDto = boardConverter.convertToDto(
                boardService.findById(boardId).orElseThrow(NotFoundException::new));
        boardDto.setCountOfStories(storyService.getBoardStoriesCount(boardId));
        return boardDto;
    }

    @GET
    @ApiOperation(value = "Find board participants")
    @Path("/{boardId}/members")
    public List<User> findMembers(@PathParam("boardId") Long boardId) {
        return boardService.findById(boardId).orElseThrow(NotFoundException::new).getUsers();
    }

    @PUT
    @ApiOperation(value = "Update board by id")
    @Path("/{boardId}")
    public void update(@PathParam("boardId") Long boardId, BoardDto boardDto) {
        Board board = boardService.findById(boardId).orElseThrow(NotFoundException::new);
        board.setName(boardDto.getName());
        boardService.update(board);
    }

    @DELETE
    @ApiOperation(value = "Delete board by id")
    @Path("/{boardId}")
    public void delete(@PathParam("boardId") Long boardId) {
        boardService.deleteById(boardId);
    }

    @Path("{boardId}/stories")
    public Class<StoryResource> storyResource() {
        return StoryResource.class;
    }

}
