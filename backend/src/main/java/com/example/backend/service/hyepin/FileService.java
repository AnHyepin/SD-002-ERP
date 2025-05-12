package com.example.backend.service.hyepin;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    public String saveImage(MultipartFile imageFile) throws IOException {
        String fileName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
        Path savePath = Paths.get(uploadDir, fileName);
        Files.copy(imageFile.getInputStream(), savePath, StandardCopyOption.REPLACE_EXISTING);
        return fileName;
    }

}
