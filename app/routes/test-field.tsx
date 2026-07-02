import { Field } from "../components/ui";

export default function TestFieldPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Field Test Page</h1>
      <div style={{ marginTop: "2rem" }}>
        <section>
          <h2>Basic Field</h2>
          <Field
            label="Basic Label"
            helperText="Basic Helper"
            placeholder="Basic Placeholder"
          />
        </section>
        <section>
          <h2>Disabled Field</h2>
          <Field
            label="Disabled Label"
            helperText="Disabled Helper"
            placeholder="Disabled Placeholder"
            disabled
          />
        </section>
        <section>
          <h2>ReadOnly Field</h2>
          <Field
            label="ReadOnly Label"
            helperText="ReadOnly Helper"
            placeholder="ReadOnly Placeholder"
            readOnly
          />
        </section>
        <section>
          <h2>MinLength Validation</h2>
          <Field
            label="MinLength Label"
            helperText="Must be at least 5 characters"
            placeholder="MinLength Placeholder"
            minLength={5}
            initialValue="abc"
          />
        </section>
      </div>
    </div>
  );
}
