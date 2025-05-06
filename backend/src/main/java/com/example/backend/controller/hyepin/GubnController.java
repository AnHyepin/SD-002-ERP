package com.example.backend.controller.hyepin;

import com.example.backend.dto.GubnDto;
import com.example.backend.service.hyepin.GubnService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/gubn")
public class GubnController {

    private final GubnService gubnService;

    @GetMapping("/{groupCode}")
    public List<GubnDto> getGubnList(@PathVariable String groupCode) {
        return gubnService.getGubnList(groupCode);
    }

    @GetMapping("/gubnCode")
    public GubnDto getGubn(@RequestParam("groupCode") String groupCode, @RequestParam("gubnCode") String gubnCode) {
        return gubnService.getGubn(groupCode, gubnCode);
    }
}
