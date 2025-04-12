import addButton from "../utils/Button.js"
import { Joystick } from "../utils/Joystick.js"

export class Player {
  heightDelta = 0

  previousHeightDelta = 0

  maxHeight = 0

  isMoving = false

  isRespawning = false

  lives = 33

  coins = 0

  hasJumpedOnce = false

  coyoteLapse = 0.1

  
  constructor(
    posX,
    posY,
    speed,
    jumpForce,
    nbLives,
    currentLevelScene,
    isInTerminalScene,
    spriteName,
    playerAreaShape
  ) {
    this.isInTerminalScene = isInTerminalScene
    this.currentLevelScene = currentLevelScene
    this.spriteName = spriteName
    this.playerAreaShape = playerAreaShape
    this.makePlayer(posX, posY)
    this.speed = speed
    this.jumpForce = jumpForce
    this.lives = nbLives
    this.previousHeight = this.gameObj.pos.y
    this.setPlayerControls()
    this.update()
  }

  makePlayer(x, y) {
    this.initialX = x
    this.initialY = y
    this.gameObj = add([
      sprite(this.spriteName, { anim: "idle" }),
      area({ shape: this.playerAreaShape }),
      anchor("center"),
      pos(x, y),
      body(),
      "player",
    ])
  }

  enablePassthrough() {
    this.gameObj.onBeforePhysicsResolve((collision) => {
      if (collision.target.is("passthrough") && this.gameObj.isJumping()) {
        collision.preventResolution()
      }

      if (collision.target.is("passthrough") && isKeyDown("down")) {
        collision.preventResolution()
      }

      if (collision.target.is("passthrough") && isKeyDown("s")) {
        collision.preventResolution()
      }
    })
  }

  enableCoinPickUp() {
    this.gameObj.onCollide("coin", (coin) => {
      this.coins++
      destroy(coin)
      play("coin")
    })
  }

  setPlayerControls() {

    const joystick = new Joystick(100, 30, 150, 600)
    let isJoystickUsing = false

    onMouseDown(() => {
      if (isJoystickUsing) {
        const direction = joystick.handleMouseDown(mousePos())
        if (direction === 'forward') {
          if (this.gameObj.paused) return
          if (this.gameObj.curAnim() !== "run") this.gameObj.play("run")
          this.gameObj.flipX = false
          if (!this.isRespawning) {
            this.gameObj.move(this.speed, 0)
          }
          this.isMoving = true
        } else if (direction === 'backward') {
          if (this.gameObj.paused) return
          if (this.gameObj.curAnim() !== "run") this.gameObj.play("run")
          this.gameObj.flipX = true
          if (!this.isRespawning) this.gameObj.move(-this.speed, 0)
          this.isMoving = true
        }
        
      }
          
    })

    onMousePress(() => {
      isJoystickUsing = joystick.handleMousePress(mousePos())
    })
    onMouseRelease(() => {
      if (isJoystickUsing) {
        joystick.handleMouseRelease()
        if (this.gameObj.paused) return
        this.gameObj.play("idle")
        this.isMoving = false
      }
    })

    const lBtn = addButton(100, 100, "J", 1150, 600)
    lBtn.onClick(() => {
      if (this.gameObj.paused) return
      if (!this.isRespawning) {
        this.gameObj.jump(this.jumpForce)
        play("jump")
      }
    })

    lBtn.onClick(()=>{console.log(123)})

    // lBtn.onHoverEnd(() => {
    //   this.gameObj.play("idle")
    //   this.isMoving = false
    // })
    // const rBtn = addButton(100, 100, "R", 250, 600)
    // rBtn.onMouseMove((p) => {
    //   console.log(rBtn.isHovering());
    //   console.log('right')
    //   if (this.gameObj.paused) return
    //   if (this.gameObj.curAnim() !== "run") this.gameObj.play("run")
    //   this.gameObj.flipX = false
    //   if (!this.isRespawning) this.gameObj.move(this.speed, 0)
    //   this.isMoving = true
    // })
    // rBtn.onHoverEnd(() => {
    //   this.gameObj.play("idle")
    //   this.isMoving = false
    //   console.log('onHoverEnd')
    // })
    // rBtn.onTouchEnd(() => {
    //   console.log(rBtn)
    //   rBtn.update()
    //   this.gameObj.play("idle")
    //   this.isMoving = false
    // })

    onKeyDown("a", () => {
      if (this.gameObj.paused) return
      if (this.gameObj.curAnim() !== "run") this.gameObj.play("run")
      this.gameObj.flipX = true
      if (!this.isRespawning) this.gameObj.move(-this.speed, 0)
      this.isMoving = true
    })

    onKeyDown("d", () => {
      if (this.gameObj.paused) return
      if (this.gameObj.curAnim() !== "run") this.gameObj.play("run")
      this.gameObj.flipX = false
      if (!this.isRespawning) this.gameObj.move(this.speed, 0)
      this.isMoving = true
    })

    onKeyDown("space", () => {
      if (this.gameObj.paused) return
      if (
        // this.gameObj.isGrounded() && 
        !this.isRespawning) {
        // this.hasJumpedOnce = true
        this.gameObj.jump(this.jumpForce)
        play("jump")
      }

      //coyote time
      if (
        !this.gameObj.isGrounded() &&
        time() - this.timeSinceLastGrounded < this.coyoteLapse &&
        !this.hasJumpedOnce
      ) {
        this.hasJumpedOnce = true
        this.gameObj.jump(this.jumpForce)
        play("jump")
      }
    })

    onKeyRelease(() => {
      if (this.gameObj.paused) return
      if (isKeyReleased("d") || isKeyReleased("a")) {
        this.gameObj.play("idle")
        this.isMoving = false
      }
    })

    // onSceneLeave(() => {
    //   joystick.removeElements()
    // })
  }

  respawnPlayer() {
    if (this.lives > 0) {
      this.gameObj.pos = vec2(this.initialX, this.initialY)
      this.lives--
      this.isRespawning = true
      setTimeout(() => (this.isRespawning = false), 1000)
      return
    }

    go("gameover")
  }

  enableMobVunerability() {
    function hitAndRespawn(context) {
      play("hit", { speed: 1.5 })
      // context.respawnPlayer()
    }
    this.gameObj.onCollide("fish", () => hitAndRespawn(this))
    this.gameObj.onCollide("spiders", () => hitAndRespawn(this))
    this.gameObj.onCollide("flames", () => hitAndRespawn(this))
    this.gameObj.onCollide("axes", () => hitAndRespawn(this))
    this.gameObj.onCollide("saws", () => hitAndRespawn(this))
    this.gameObj.onCollide("birds", () => hitAndRespawn(this))
  }

  
  update() {
    onUpdate(() => {
      if (this.gameObj.isGrounded()) {
        this.hasJumpedOnce = false
        this.timeSinceLastGrounded = time()
      }

      this.previousHeightDelta = this.heightDelta
      this.heightDelta = this.previousHeight - this.gameObj.pos.y
      this.previousHeight = this.gameObj.pos.y

      if (this.heightDelta < 0 && this.previousHeightDelta >= 0) {
        this.maxHeight = this.gameObj.pos.y
    }

      if (!this.isMoving && this.gameObj.curAnim() !== "idle") {
        this.gameObj.play("idle")
      }

      if (
        !this.gameObj.isGrounded() &&
        this.gameObj.curAnim() !== "jump-up"
      ) {
        this.gameObj.play("jump-up")
      }

      if (
        !this.gameObj.isGrounded() &&
        this.heightDelta < 0 &&
        this.gameObj.pos.y > this.maxHeight*1.5 &&
        this.gameObj.curAnim() !== "jump-down"
      ) {
        this.gameObj.play("jump-down")
      }

      if (this.gameObj.pos.y > 1000) {
        play("hit", { speed: 1.5 })
        this.respawnPlayer()
      }
    })
  }

  updateLives(livesCountUI) {
    onUpdate(() => {
      livesCountUI.text = `${this.lives}`
    })
  }

  updateCoinCount(coinCountUI) {
    onUpdate(() => {
      coinCountUI.text = `${this.coins} / ${coinCountUI.fullCoinCount}`
      if (this.coins === coinCountUI.fullCoinCount) {
        go(this.isInTerminalScene ? "end" : this.currentLevelScene + 1)
      }
    })
  }
}
