import foo from "./foo";
import Foo from "@/components/my-foo.vue";
import { mount } from "@vue/test-utils";
test("1+1=2", () => {
  expect(foo()).toBe("foo");
  console.log(mount(Foo));
  expect(1 + 1).toBe(2);
});
