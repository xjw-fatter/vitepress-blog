export const listener = {
    copy: () => {
        /** 监听copy事件 */
        document && document.addEventListener("copy", function (event: any) {
            const selectedText = (window.getSelection() as any).toString();
            const newText = `${selectedText}\n————————————————\n复制什么呢，小心锤你噢[/手动狗头]`;
            event.clipboardData.setData('text/plain', newText);
            // 阻止默认的复制行为
            event.preventDefault();
        })
    },
    remove: (name: string) => {
        if (!name) return;
        document && document.removeEventListener(name, () => {
            console.log(`移除${name}完成`);
        });
    },
};
