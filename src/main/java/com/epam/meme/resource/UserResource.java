package com.epam.meme.resource;

import com.epam.meme.dtoconverter.UserConverter;
import com.epam.meme.dto.UserCookieDto;
import com.epam.meme.dto.UserDto;
import com.epam.meme.entity.User;
import com.epam.meme.service.BoardService;
import com.epam.meme.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.yaml.snakeyaml.util.UriEncoder;

import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.NewCookie;
import javax.ws.rs.core.Response;
import java.time.LocalDateTime;
import java.util.Optional;

@Path("/users")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Api(value = "/users", description = "Manage users")
public class UserResource {

    private static final String COOKIE_NAME = "user";
    private static final String COOKIE_PATH = "/";
    //private static final String COOKIE_DOMAIN = ".hanatrial.ondemand.com";
    private static final String COOKIE_DOMAIN = "127.0.0.1";
    private static final short COOKIE_EXPIRES_TIME = -1;
    private static final boolean COOKIE_SECURE = false;

    @Autowired
    private UserService userService;

    @Autowired
    private BoardService boardService;

    @Autowired
    private UserConverter userConverter;

    @Autowired
    private User currentUser;

    @POST
    @ApiOperation(value = "Create user")
    public Response create(@Valid UserDto userDto) throws JsonProcessingException {

        Optional<User> optionalUser;
        User user = userConverter.convertToEntity(userDto);
        user.setLastActivityTime(LocalDateTime.now());

        if (!(optionalUser = userService.findByUsername(user.getUsername())).isPresent()) {
            optionalUser = Optional.of(userService.create(user));
        } else{
            userService.updateByUsername(user.getLastActivityTime(), user.getUsername());
        }
        UserCookieDto userCookieDto = userConverter.convertToCookieDto(
                optionalUser.orElseThrow(NotFoundException::new));

        ObjectMapper objectMapper = new ObjectMapper();
        String encodedUserJson = UriEncoder.encode(objectMapper
                .writeValueAsString(userCookieDto)
                .replace(',', '|'));

        return Response
                .ok(userCookieDto)
                .cookie(new NewCookie(
                        COOKIE_NAME,
                        encodedUserJson,
                        COOKIE_PATH,
                        COOKIE_DOMAIN,
                        null,
                        COOKIE_EXPIRES_TIME,
                        COOKIE_SECURE))
                .build();
    }

    @GET
    @ApiOperation(value = "Find user by id")
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/current-user")
    public UserDto findById() {
        User user = userService.findById(currentUser.getId()).orElseThrow(NotFoundException::new);
        UserDto userDto = userConverter.convertToDto(user);
        userDto.setCountOfBoards(boardService.getUserBoardCount(currentUser.getId()));
        return userDto;
    }

    @Path("/current-user/boards")
    public Class<BoardResource> boardResource() {
        return BoardResource.class;
    }

    @DELETE
    @ApiOperation(value = "Delete user by id")
    @Path("/current-user")
    public void delete() {
        userService.deleteById(currentUser.getId());
    }

}
