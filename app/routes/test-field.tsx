import { createRoute } from "honox/factory";
import { Field, Textarea } from "../components/ui";
import { css } from "../../styled-system/css";

export default createRoute((c) => {
  return c.render(
    <div class={css({ p: "8", display: "flex", flexDirection: "column", gap: "8" })}>
      <h1>Field Test Page</h1>

      <section>
        <h2>Basic Field</h2>
        <Field
          id="basic-field"
          label="Basic Label"
          helperText="Basic Helper"
          placeholder="Basic Placeholder"
        />
      </section>

      <section>
        <h2>MinLength Validation</h2>
        <Field
          id="minlength-field"
          label="MinLength Label"
          minLength={5}
          defaultValue="abc"
          placeholder="Min 5 chars"
          interactive
        />
      </section>

      <section>
        <h2>Custom Validator</h2>
        <Field
          id="validator-field"
          label="Validator Label"
          validator={(val: string) => val.includes("@") ? true : "Invalid email"}
          defaultValue="no-at"
          placeholder="Email with @"
          interactive
        />
      </section>

      <section>
        <h2>Disabled Field</h2>
        <Field
          id="disabled-field"
          label="Disabled Label"
          disabled
          defaultValue="I am disabled"
        />
      </section>

      <section>
        <h2>ReadOnly Field</h2>
        <Field
          id="readonly-field"
          label="ReadOnly Label"
          readOnly
          defaultValue="I am readonly"
        />
      </section>

      <section>
        <h2>Composition with Textarea</h2>
        <Field
          id="textarea-field"
          label="Textarea Label"
          minLength={10}
          defaultValue="short"
          interactive
        >
          <Textarea id="custom-textarea" placeholder="Long bio..." />
        </Field>
      </section>
    </div>
  );
});
