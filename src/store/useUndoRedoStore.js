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
            // 如果当前状态不可记录(撤销、重做操作时)，则直接返回
            if (!this.isRecord) {
                return;
            }
            if (this.currentIndex < this.history.length - 1) {
                this.history.splice(this.currentIndex + 1);
            }
            // 深拷贝当前状态以生成新的快照
            const currentState = JSON.parse(JSON.stringify(state));
            this.history.push(currentState);
            if (this.history.length > this.maxSteps) {
                this.history.shift(); // 如果超出最大步数，则移除最早的一个状态
            }
            this.currentIndex = this.history.length -1

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
        // 将当前状态重置为初始状态
        reset() {
            const current = this.history?.[this.currentIndex]
            this.history = current?[current]:[]
            this.currentIndex = 0;
        },
        // 更新是否可记录状态快照 用于在撤销、重做时禁止添加snapshot记录
        updateIsRecord(val){
            this.isRecord = val
        }
    },
});
