# Clase 1

### C9.io

**Creamos una cuenta y un workespace con referencia a nuestro repositorio de GitHub**
- [c9.io](https://c9.io/)

**Configurando GitHub**

- [Setup Git and basic commands](http://git-scm.com/book/es/v1/Empezando-Configurando-Git-por-primera-vez)

* Setup `git: git config remote.origin.push HEAD`.
 * `git config --global user.name "John Doe"`.
 * `git config --global user.email johndoe@example.com`.
* Git commands: `git status, git add, git rm, git pull, git commit -m "Commit message", git push`.

### Git y Github

Podéis encontrar todo el material de apoyo en este enlace

**Introducción**

[Como trabajar con Git](http://nvie.com/img/git-model@2x.png)
![Como trabajar con Git](http://nvie.com/img/git-model@2x.png)

[Diversos Entornos](http://www.rittmanmead.com/wp-content/uploads/2013/01/NewImage1.png)
![Diversos Entornos](http://www.rittmanmead.com/wp-content/uploads/2013/01/NewImage1.png)


**Instalación**

Instalamos [Git - Source Code Management](http://git-scm.com/)

Comprobamos la instalación

```
git --version
```


**Bienvenidos a la maquina del tiempo**
- Arquitectura de Árbol(working area, staging Area, Repository)
- Auditoria de código (quien? cuando? y que?)
- Git trabaja en binario (imagenes, docs, etc...)
- Git no guarda una copia de cada version, solo los cambios.
- Distribución (Repositorios y Clones)
- Opensource y funciona offline
- Consola vs. GUI



**Trabajando en Local**

Configuración (entornos):

[Repositorios locales y remotos](http://media.tumblr.com/tumblr_lbnpoxYtNm1qaku05.png)
![Repositorios locales y remotos](http://media.tumblr.com/tumblr_lbnpoxYtNm1qaku05.png)

- System (todos los usuarios)
    - git config --system
    - etc/gitconfig, /usr/local/git/etc/gitconfig

- Global (mi usuario)
    - git config --global
    - .gitconfig (usuario/root)

- Project (proyecto)
    - git config
    - /proyect/.git/config


**Comandos básicos**

versión
```
git --version
```

Grabando Nombre
```
git config --global user.name "nombre"
```

Comprobando el nombre
```
git config --global user.name
```

Grabando Email
```
git config --global user.email "email"
```

Habilitando colores
```
git config --global color.ui true
```

Ver usuarios en el equipo
```
git config --global --list
```


**GIT Working flow (local) - Básico**

- help (ayuda)

    - Ayuda general
    ```
    git config --global --list
    ```

    - Ayuda especifica
    ```
    git help push
    ```

    - Salir de la ayuda
    ```
    q (quit)
    ```

- init (arranque)
    - Buscamos la carpeta (ls, dir...)
    - Arrancando Git
    ```
    git init
    ```

- status
    - Verificar estado
    ```
    git status
    ```

- add
    - Añadiendo todo
    ```
    git add -A
    ```

    - Añadiendo todo *(como add -A, pero omite los archivos fuera de track)*
    ```
    git add .
    ```

    - Añadiendo un archivo especifico
    ```
    git add loquesea
    ```

- commit
    - Comentando el commit
    ```
    git commit -m "Mi primer commit"
    ```

- log
    - Verificando el estado de los commits
    ```
    git log
    ```

- reset (Reseteamos el proyecto hasta un punto dado (SIN RETORNO!))
    - No afecta al working area ni al Stagging Area, solo al repositorio
    ```
    git reset --soft NUMEROCOMMIT
    ```

    - No afecta al working area
    ```
    git reset --mixed NUMEROCOMMIT
    ```

    - Afecta a todos los niveles incluido el working area
    ```
    git reset --hard NUMEROCOMMIT
    ```

    - En caso de necesitar recuperación.
      Haz un reset --hard hacia delante, con el número del útimo commit.
      ```
      git reset --hard ULTIMOCOMMIT
      ```

    - Devolver un archivo de staging a working area
    ```
    git reset HEAD nombrearchivo
    ```    


**GIT Working flow (local) - Viajar en el tiempo**

- log
    - Hacemos una copia de seguridad de nuestros commits.
    ```
    git log > miscommits.txt
    ```

- checkout

    - Abrimos la maquina de tiempo
    ```
    git checkout NUMEROCOMMIT
    ```

    - Volvemos a Master
    ```
    git checkout master
    ```


**GIT Working flow (local) - Ramas (Branches)**

Ramas (Universos Paralelos)
*Línea master -> linea estable o principal.*
*Lineas secundarias -> lineas de desarrollo, bugs, experimentos, etc...*

- branch

    - Crear una rama
    ```
    git branch NOMBRERAMA
    ```

    - Ver ramas
    ```
    git branch
    ```    

    - Cambiar de rama
    ```
    git checkout NOMBRERAMA
    ```  

    - Ver cambios en formato ramas
    ```
    git log --oneline --graph --all
    ```  

    - Borrar una rama
    ```
    git branch -d NOMBRERAMA
    ```


**GIT Working flow (local) - Fusiones (básico)**

- Nos situamos en la rama que absorberá (principal)
    ```
    git checkout RAMAPRINCIAL
    ```

- Hacemos el *merge*
    ```
    git merge RAMASECUNDARIA
    ```

- Añadir comentario (o)

- Guardar y salir (:x)

- Ramas fusionadas
    ```
    git branch
    ```

- Borramos rama
    ```
    git branch -d NOMBRERAMA
    ```


**GIT Working flow (local) - Fusiones (gestión conflictos)**

  - Fast-forward (automatizado). No hay conflicto alguno.

    - Nos situamos en la rama que absorberá (principal)
    ```
    git checkout RAMAPRINCIAL
    ```

    - Hacemos el MERGE
    ```
    git merge RAMASECUNDARIA
    ```

    - Añadir comentario (o)

    - Guardar y salir (:x)


  - Manual Merge (Conflicto, dos personas tocaron los mismos archivos)

    - Nos situamos en la rama que absorberá (principal)
    ```
    git checkout RAMAPRINCIAL
    ```

    - Hacemos el MERGE
    ```
    git merge RAMASECUNDARIA
    ```

    - En consola
    ```
    Auto-merging CARPETA/ARCHIVO
    CONFLICT (content): Merge conflict in CARPETA/ARCHIVO
    Automatic merge failed; fix conflicts and then commit the result.
    ```

    - En el editor
    ```
    <<<<<<< HEAD
    hello world....!!!!!!!
    =======
    hello world 2 ..!!!
    >>>>>>> conflictiva
    ```

    - Resuelver y guardar
    ```
    hello world 2 ..!!!
    ```

    - Comprobamos el estado
    ```
    git status
    ```

    - commit para la resolución conflicto
    ```
    git commit -am "con este commit se arregla el conflicto"
    ```

    - Resultado
    ```
    *   81a6c1d con este commit se arregla el conflicto
    |\  
    | * 64b5518 que pasa
    * | 29a6348 ahora conflcito..no
    |/  
    * afe16ae Todo arriba..
    * 7c9cc50 Mi primer Commit
    ```

    - Borramos la rama (opcional)
    ```
    git branch -d NOMBRERAMA
    ```


**GITHUB Working flow (básico)**
  - clone
    - Clonar un proyecto ( [Bootstrap](https://github.com/twbs/bootstrap) )
    ```
    git clone https://github.com/twbs/bootstrap.git
    ```

  - log
    - Mirar los commits
    ```
    git log
    ```    


**GITHUB Working flow (Proyecto desde cero)**

  - Creamos los ficheros

  - init
    - monitorizamos los ficheros
    ```
    git init
    ```

  - commit
    - Añadimos los ficheros en un commit
    ```
    git commit -am "Mi primer proyecto"
    ```

  - remote
    - Enlazamos con Github
    ```
    git remote add origin <--HTTPoSSH-->
    ```

    - Comprobamos los detalles
    ```
    git remote -v
    ```

  - push
    - Mandamos los cambios
    ```
    git push origin master
    ```

**GITHUB Working flow (Proyecto en equipo)**
El proceso es igual, pero es necesario mantenerse sincronizado.

  - fetch
    - Actualizar *origin/master* (rama espejo en local)
    ```
    git fetch origin
    ```

  - merge
    - Fusionar *master* con *origin/master*
    ```
    git merge origin/master
    ```

  - commit
    - Preparamos un *commit* para subir un cambio a Github
    ```
    git commit -am "Nuevo cambio"
    ```

  - push
    - Subimos los cambios
    ```
    git push origin master
    ```


**GITHUB Working flow (Proyectos de terceros)**
*Usamos 2 repositorios (ORIGINAL EXTERNO (upstream/master) -> CLON ORIGINAL (origin/master) -> CLON LOCAL)*

  - remote
    - Conectamos al fork (origin)
    ```
    git remote add origin <--- HTTP --->
    ```

    - Verificamos la conexión
    ```
    git remote -v
    ```

    - Conectamos al remoto *(Upstream)*
    ```
    git remote add upstream HTTTPREPO-UPS
    ```

    - Verificamos que tenemos dos enlaces *(origin y upstream)*
    ```
    git remote -v
    ```

  - fetch
    - Comprobamos cambios en *origin*
    ```
    git fetch origin
    ```

    - Comprobamos cambios con *upstream*
    ```
    git fetch upstream
    ```

  - merge
    - Fusionamos *upstream* con local para actualizarnos
    ```
    git merge upstream/master
    ```

  - push
    - Subimos cambios a *origin*
    ```
    git push origin master
    ```

  - Subimos cambios al *upstream (pull-request)*



**GITHUB Working flow (GitHub Pages Manual)**
GitHub Pages nos permite hacer una web estática para nuestro usuario o proyectos

  - clone
    - Clonamos el repositorio
    ```
    git rclone <-- URL.git -->
    ```

  - checkout --orphan
    - Creamos una rama huérfana
    ```
    git checkout --orphan gh-pages
    ```

  - rm
    - Borramos todos los archivos del directorio
    ```
    git rm --rf .
    ```

  - add
    - Creamos nuestro index.html y lo añadimos
    ```
    echo "Bienvenido a gh-pages" > index.html
    git add index.html
    ```

  - commit
    - Preparamos un commit para subir el index a Github
    ```
    git commit -am "Nuevo cambio"
    ```

  - push
    - Subimos el cambio
    ```
    git push origin gh-pages
    ```


**GITHUB Avanzado (Trucos)**


  - branch
    - Renombrar rama
    ```
    git branch -m NOMBRERAMA NOMBRERAMANUEVO
    ```

    - Mostrando todas las ramas (incluido espejos)
    ```
    git branch -a
    ```

  - add + commit
    - am
    ```
    git commit -am "Texto"
    ```

  - config
    - Usando un alias
    ```
    git config --global alias.NOMBREALIAS 'COMANDO'
    git config --global alias.buenlog 'log --oneline --graph --all'
    git buenlog
    ```

  - pull
    - fecht + merge
    ```
    git pull
    ```

  - diff
    - Ver lo que has modificado pero aún no has preparado
    ```
    git diff
    ```

    - Ver los cambios que has preparado y que irán en tu próxima confirmación
    ```
    git diff --cached
    ```

**Resumen**
![Trabajar con Git/Github](http://www.geekgumbo.com/wp-content/uploads/2011/08/nvie-git-workflow-commands.png)
[tamaño original](http://www.geekgumbo.com/wp-content/uploads/2011/08/nvie-git-workflow-commands.png)