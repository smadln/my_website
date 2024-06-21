import pygame
from pygame.locals import *
from OpenGL.GL import *
from OpenGL.GLU import *
from PIL import Image

def loadTexture(image):
    img = Image.open(image)
    img = img.convert('RGBA')  # Convert the image to RGBA format to include the alpha channel
    img_data = img.tobytes()
    width, height = img.size
    glEnable(GL_TEXTURE_2D)
    texture = glGenTextures(1)
    glBindTexture(GL_TEXTURE_2D, texture)
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT)
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT)
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR)
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR)
    glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA, width, height, 0, GL_RGBA, GL_UNSIGNED_BYTE, img_data)
    return texture

def drawPlane(texture):
    glBindTexture(GL_TEXTURE_2D, texture)
    glBegin(GL_QUADS)
    glTexCoord2f(0.0, 0.0)
    glVertex3f(-1.0, -1.0, 0.0)
    glTexCoord2f(1.0, 0.0)
    glVertex3f(1.0, -1.0, 0.0)
    glTexCoord2f(1.0, 1.0)
    glVertex3f(1.0, 1.0, 0.0)
    glTexCoord2f(0.0, 1.0)
    glVertex3f(-1.0, 1.0, 0.0)
    glEnd()

def main():
    pygame.init()
    display = (800, 600)
    pygame.display.set_mode(display, DOUBLEBUF | OPENGL)
    gluPerspective(45, (display[0] / display[1]), 0.1, 50.0)
    glTranslatef(0.0, 0.0, -5)
    
    # Enable blending to support transparency
    glEnable(GL_BLEND)
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA)
    
    texture = loadTexture('image.png')  # Use your transparent PNG file here
    
    rotation_x = 0
    rotation_y = 0
    translation_x = 0
    translation_y = 0
    
    clock = pygame.time.Clock()
    
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()
        
        keys = pygame.key.get_pressed()
        
        # Update translation based on arrow keys
        if keys[pygame.K_LEFT]:
            translation_x -= 0.1
        if keys[pygame.K_RIGHT]:
            translation_x += 0.1
        if keys[pygame.K_UP]:
            translation_y += 0.1
        if keys[pygame.K_DOWN]:
            translation_y -= 0.1
        
        # Update rotation based on WASD keys
        if keys[pygame.K_a]:
            rotation_y -= 1
        if keys[pygame.K_d]:
            rotation_y += 1
        if keys[pygame.K_w]:
            rotation_x -= 1
        if keys[pygame.K_s]:
            rotation_x += 1
        
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)
        
        glLoadIdentity()
        gluPerspective(45, (display[0] / display[1]), 0.1, 50.0)
        glTranslatef(translation_x, translation_y, -5)
        glRotatef(rotation_x, 1, 0, 0)
        glRotatef(rotation_y, 0, 1, 0)
        
        drawPlane(texture)
        
        pygame.display.flip()
        clock.tick(60)

if __name__ == "__main__":
    main()