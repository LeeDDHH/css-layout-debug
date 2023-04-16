import { useState } from "react"

import { sendToContentScript } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

function IndexPopup() {
  // DOMレイアウトのデッバック状態
  const [enableCSSDebug, setEnableCSSDebug] = useState<boolean>(false)

  const sendToCSSLayoutDebugContentScript = async () => {
    // 更新用の状態
    const newCSSDebugState = !enableCSSDebug
    // Content Script経由でブラウザ側のDOMレイアウトの状態を更新する
    await sendToContentScript({
      name: "css-layout-debug",
      body: { debug: newCSSDebugState }
    })
    // DOMレイアウトのデッバックの状態を更新する
    setEnableCSSDebug(newCSSDebugState)
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <h2>CSS Layout Debug</h2>
      <button onClick={sendToCSSLayoutDebugContentScript}>
        {enableCSSDebug ? "終了" : "開始"}
      </button>
    </div>
  )
}

export default IndexPopup
