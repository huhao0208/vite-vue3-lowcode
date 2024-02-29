import { defineStore } from 'pinia';

export const useUndoRedoStore = defineStore('undoRedo', {
    state: () => ({
        history: [], // 存储操作的历史记录
        currentIndex: -1, // 当前历史记录的索引
        maxSteps: 20, // 最大可存储的历史步骤数
        isRecord: true, // 是否可记录状态快照 Can status snapshots be recorded

    }),
    getters: {
        canUndo() {
            return this.currentIndex > 0;
        },
        canRedo() {
            return this.currentIndex < this.history.length - 1;
        },
    },
    actions: {
        // 添加一个新的状态快照到历史记录
        snapshot(state) {
            if (!this.isRecord) {
                return;
            }
            if (this.currentIndex < this.history.length - 1) {
                this.history.splice(this.currentIndex + 1);
            }

            // 深拷贝当前状态以生成新的快照
            const currentState = JSON.parse(JSON.stringify(state));
            if (this.history.length >= this.maxSteps) {
                this.history.shift(); // 如果超出最大步数，则移除最早的一个状态
            }
            this.history.push(currentState);
            this.currentIndex++;
        },

        // 撤销上一步操作
        undo() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
                return this.history[this.currentIndex];
            }
            return null; // 当无法撤销时返回空
        },

        // 重做上一步被撤销的操作
        redo() {
            if (this.currentIndex < this.history.length - 1) {
                this.currentIndex++;
                return this.history[this.currentIndex];
            }
            return null; // 当无法重做时返回空
        },
        // 更新是否可记录状态快照
        updateIsRecord(val){
            this.isRecord = val
        }
    },
});
